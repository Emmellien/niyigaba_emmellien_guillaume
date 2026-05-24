import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  Search,
  Package,
  Trash2,
  DollarSign,
  TrendingUp,
  Boxes
} from "lucide-react";

function StockIn() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [records, setRecords] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    cost_price: "",
    supplier_name: ""
  });

  const API =
    "http://localhost:5000/api/stockin";

  const PRODUCT_API =
    "http://localhost:5000/api/products";

  //
  // GET STOCK IN
  //
  const getStockIn = async () => {

    try {

      const res = await axios.get(API);

      setRecords(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  //
  // GET PRODUCTS
  //
  const getProducts = async () => {

    try {

      const res =
        await axios.get(PRODUCT_API);

      setProducts(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  //
  // SUBMIT
  //
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(API, form);

      setForm({
        product_id: "",
        quantity: "",
        cost_price: "",
        supplier_name: ""
      });

      getStockIn();

    } catch (err) {

      console.log(err);
    }
  };

  //
  // DELETE
  //
  const deleteRecord = async (id) => {

    try {

      await axios.delete(`${API}/${id}`);

      getStockIn();

    } catch (err) {

      console.log(err);
    }
  };

  //
  // FILTER
  //
  const filteredRecords = useMemo(() => {

    return records.filter((item) =>

      item.name
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      item.supplier_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [records, search]);

  useEffect(() => {

    getStockIn();

    getProducts();

  }, []);

  return (

    <div className="flex bg-slate-100 min-h-screen">

      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <div className="flex-1 min-w-0 md:ml-72 p-4 md:p-6">

        {/* HEADER */}
        <Header
          onMenuToggle={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          {/* TOTAL */}
          <div className="bg-white rounded-2xl p-5 border shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Transactions
                </p>

                <h1 className="text-3xl font-bold mt-2">
                  {records.length}
                </h1>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <TrendingUp size={28} />
              </div>

            </div>

          </div>

          {/* PRODUCTS */}
          <div className="bg-white rounded-2xl p-5 border shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Products
                </p>

                <h1 className="text-3xl font-bold mt-2">
                  {products.length}
                </h1>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <Boxes size={28} />
              </div>

            </div>

          </div>

          {/* TOTAL QUANTITY */}
          <div className="bg-white rounded-2xl p-5 border shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Quantity
                </p>

                <h1 className="text-3xl font-bold mt-2">
                  {
                    records.reduce(
                      (acc, item) =>
                        acc +
                        Number(item.quantity),
                      0
                    )
                  }
                </h1>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Package size={28} />
              </div>

            </div>

          </div>

          {/* TOTAL AMOUNT */}
          <div className="bg-white rounded-2xl p-5 border shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total Amount
                </p>

                <h1 className="text-3xl font-bold mt-2">
                  $
                  {
                    records
                      .reduce(
                        (acc, item) =>
                          acc +
                          Number(item.amount),
                        0
                      )
                      .toFixed(2)
                  }
                </h1>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                <DollarSign size={28} />
              </div>

            </div>

          </div>

        </div>

        {/* MAIN BOX */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 md:p-6">

          {/* TOP */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">

            <div>

              <h1 className="text-2xl font-bold">
                Stock In Management
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Manage incoming stock
              </p>

            </div>

            {/* SEARCH */}
            <div className="flex items-center bg-slate-100 px-4 py-3 rounded-xl w-full lg:w-80">

              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="bg-transparent outline-none ml-2 w-full"
              />

            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6"
          >

            {/* PRODUCT */}
            <select
              value={form.product_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  product_id: e.target.value
                })
              }
              className="border rounded-xl px-4 py-3"
              required
            >

              <option value="">
                Select Product
              </option>

              {products.map((p) => (

                <option
                  key={p.Product_id}
                  value={p.Product_id}
                >
                  {p.name}
                </option>
              ))}

            </select>

            {/* QUANTITY */}
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: e.target.value
                })
              }
              className="border rounded-xl px-4 py-3"
              required
            />

            {/* COST PRICE */}
            <input
              type="number"
              placeholder="Cost Price"
              value={form.cost_price}
              onChange={(e) =>
                setForm({
                  ...form,
                  cost_price: e.target.value
                })
              }
              className="border rounded-xl px-4 py-3"
              required
            />

            {/* SUPPLIER */}
            <input
              type="text"
              placeholder="Supplier Name"
              value={form.supplier_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  supplier_name: e.target.value
                })
              }
              className="border rounded-xl px-4 py-3"
              required
            />

            {/* BUTTON */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition">

              Add Stock

            </button>

          </form>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-xl border">

            <table className="w-full min-w-[1100px]">

              <thead className="bg-slate-50">

                <tr>

                  <th className="p-4 text-left">
                    Product
                  </th>

                  <th className="p-4 text-left">
                    Qty
                  </th>

                  <th className="p-4 text-left">
                    Cost Price
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Supplier
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>

                  <th className="p-4 text-right">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  filteredRecords.length > 0
                  ? (
                    filteredRecords.map((item) => (

                      <tr
                        key={item.stockin_id}
                        className="border-t hover:bg-slate-50"
                      >

                        {/* PRODUCT */}
                        <td className="p-4">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                              <Package size={18} />
                            </div>

                            <div>

                              <h2 className="font-semibold">
                                {item.name}
                              </h2>

                              <p className="text-xs text-slate-400">
                                Product ID:
                                {item.Product_id}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* QTY */}
                        <td className="p-4 text-green-600 font-bold">
                          +{item.quantity}
                        </td>

                        {/* COST */}
                        <td className="p-4">
                          ${item.cost_price}
                        </td>

                        {/* AMOUNT */}
                        <td className="p-4 font-semibold">
                          ${item.amount}
                        </td>

                        {/* SUPPLIER */}
                        <td className="p-4">
                          {item.supplier_name}
                        </td>

                        {/* DATE */}
                        <td className="p-4 text-sm text-slate-500">

                          {
                            new Date(
                              item.created_at
                            ).toLocaleDateString()
                          }

                        </td>

                        {/* ACTION */}
                        <td className="p-4">

                          <div className="flex justify-end">

                            <button
                              onClick={() =>
                                deleteRecord(
                                  item.stockin_id
                                )
                              }
                              className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center"
                            >

                              <Trash2 size={18} />

                            </button>

                          </div>

                        </td>

                      </tr>
                    ))
                  )
                  : (
                    <tr>

                      <td
                        colSpan="7"
                        className="p-10 text-center text-slate-400"
                      >
                        No stock records found
                      </td>

                    </tr>
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StockIn;