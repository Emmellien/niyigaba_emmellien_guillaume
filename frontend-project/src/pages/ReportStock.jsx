import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Search,
  Download,
  Printer,
  TrendingUp,
  TrendingDown,
  Package
} from "lucide-react";

function ReportStock() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tab, setTab] = useState("daily"); // daily | monthly | product

  const [summary, setSummary] = useState({});
  const [lowStock, setLowStock] = useState([]);

  const [reportData, setReportData] = useState([]);

  const [search, setSearch] = useState("");

  const API = "http://localhost:5000/api/report";

  // LOAD DATA
  const loadData = async () => {
    try {
      const [sum, low, daily, monthly, product] = await Promise.all([
        axios.get(`${API}/summary`),
        axios.get(`${API}/low-stock`),
        axios.get(`${API}/daily`),
        axios.get(`${API}/monthly`),
        axios.get(`${API}/product-report`)
      ]);

      setSummary(sum.data);
      setLowStock(low.data);

      if (tab === "daily") setReportData(daily.data);
      if (tab === "monthly") setReportData(monthly.data);
      if (tab === "product") setReportData(product.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [tab]);

  // SEARCH FILTER
  const filtered = useMemo(() => {
    return reportData.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );
  }, [reportData, search]);

  // CSV EXPORT
  const exportCSV = () => {
    const csv = [
      Object.keys(filtered[0] || {}).join(","),
      ...filtered.map(r => Object.values(r).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}-report.csv`;
    a.click();
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 md:ml-72 p-3 sm:p-4 md:p-6">

        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* ================= DASHBOARD CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <Card title="Stock In" value={summary.total_in} icon={<TrendingUp />} color="green" />
          <Card title="Stock Out" value={summary.total_out} icon={<TrendingDown />} color="red" />
          <Card title="Profit" value={summary.profit} icon={<TrendingUp />} color="blue" />
          <Card title="Products" value={summary.total_products} icon={<Package />} color="purple" />

        </div>

        {/* ================= LOW STOCK ================= */}
        <div className="bg-white p-4 rounded-2xl mb-6">
          <h2 className="font-bold mb-2">⚠ Low Stock Alerts</h2>

          <div className="flex flex-wrap gap-2">
            {lowStock.map((p) => (
              <span key={p.Product_id} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                {p.name} ({p.stock})
              </span>
            ))}
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex flex-wrap gap-2 mb-4">

          <button onClick={() => setTab("daily")}
            className={`px-4 py-2 rounded-xl ${tab === "daily" ? "bg-blue-600 text-white" : "bg-white"}`}>
            Daily
          </button>

          <button onClick={() => setTab("monthly")}
            className={`px-4 py-2 rounded-xl ${tab === "monthly" ? "bg-blue-600 text-white" : "bg-white"}`}>
            Monthly
          </button>

          <button onClick={() => setTab("product")}
            className={`px-4 py-2 rounded-xl ${tab === "product" ? "bg-blue-600 text-white" : "bg-white"}`}>
            Product Stock
          </button>

        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">

          <div className="bg-white p-3 rounded-xl flex items-center w-full md:w-96">
            <Search size={18} />
            <input
              className="ml-2 w-full outline-none"
              placeholder="Search report..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button onClick={exportCSV} className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2">
              <Download size={16} /> CSV
            </button>

            <button onClick={() => window.print()} className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2">
              <Printer size={16} /> Print
            </button>
          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-2xl overflow-x-auto shadow-sm">

          <table className="w-full min-w-[900px] text-sm">

            <thead className="bg-slate-50 text-slate-600">
              <tr>

                {tab !== "product" ? (
                  <>
                    <th className="p-4 text-left">Period</th>
                    <th className="p-4 text-left">Total ($)</th>
                  </>
                ) : (
                  <>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">In Qty</th>
                    <th className="p-4 text-left">Out Qty</th>
                    <th className="p-4 text-left">Balance</th>
                    <th className="p-4 text-left">Profit</th>
                  </>
                )}

              </tr>
            </thead>

            <tbody>

              {filtered.map((item, i) => (
                <tr key={i} className="border-t hover:bg-slate-50">

                  {tab !== "product" ? (
                    <>
                      <td className="p-4">{item.period || item.date || item.month}</td>
                      <td className="p-4 font-bold">${item.total}</td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 font-semibold">{item.product_name}</td>
                      <td className="p-4 text-green-600">{item.stockin_qty}</td>
                      <td className="p-4 text-red-600">{item.stockout_qty}</td>
                      <td className="p-4 font-bold">{item.stock_balance}</td>
                      <td className="p-4 font-bold text-blue-600">${item.profit}</td>
                    </>
                  )}

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

// CARD
function Card({ title, value, icon, color }) {

  const colors = {
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600"
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h1 className="text-2xl font-bold">{value}</h1>
      <div className={`w-10 h-10 mt-2 flex items-center justify-center rounded-xl ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
}

export default ReportStock;