// pages/StockOut.jsx

import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
  Search,
  Package,
  Trash2,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Warehouse
} from "lucide-react";

function StockOut() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [records, setRecords] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [available, setAvailable] =
    useState(0);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    selling_price: "",
    receiver_name: "",
    department: ""
  });

  const API =
    "http://localhost:5000/api/stockout";

  const PRODUCT_API =
    "http://localhost:5000/api/products";

  //
  // GET STOCK OUT
  //
  const getStockOut = async () => {

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
  // GET AVAILABLE STOCK
  //
  const getAvailableStock = async (id) => {

    try {

      const res =
        await axios.get(
          `${API}/available/${id}`
        );

      setAvailable(res.data.available);

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

      setError("");

      await axios.post(API, form);

      setForm({
        product_id: "",
        quantity: "",
        selling_price: "",
        receiver_name: "",
        department: ""
      });

      setAvailable(0);

      getStockOut();

    } catch (err) {

      setError(
        err.response?.data?.message
      );
    }
  };

  //
  // DELETE
  //
  const deleteRecord = async (id) => {

    try {

      await axios.delete(`${API}/${id}`);

      getStockOut();

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

      item.receiver_name
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      item.department
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [records, search]);

  useEffect(() => {

    getStockOut();

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

          {/* TRANSACTIONS */}
          <div className="bg-white rounded-2xl p-5 border shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500">
                  Transactions
                </p>

                <h1 className="text-3xl font-bold mt-2">
                  {records.length}
                </h1>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <TrendingDown size={28} />
              </div>

            </div>

          </div>

          {/* PRODUCTS */}
          <div className="bg-white rounded-2xl p-5 border shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500">
                  Products
                </p>

                <h1 className="text-3xl font-bold mt-2">
                  {products.length}
                </h1>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Package size={28} />
              </div>

            </div>

          </div>

          {/* AVAILABLE */}
          <div className="bg-white rounded-2xl p-5 border shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500">
                  Available
                </p>

                <h1 className="text-3xl font-bold mt-2 text-green-600">
                  {available}
                </h1>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                <Warehouse size={28} />
              </div>

            </div>

          </div>

          {/* AMOUNT */}
          <div className="bg-white rounded-2xl p-5 border shadow-sm">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500">
                  Revenue
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

              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
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
                Stock Out Management
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Manage outgoing stock
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

          {/* ERROR */}
          {error && (

            <div className="bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 flex items-center gap-2">

              <AlertTriangle size={18} />

              <span>{error}</span>

            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mb-6"
          >

            {/* PRODUCT */}
            <select
              value={form.product_id}
              onChange={(e) => {

                setForm({
                  ...form,
                  product_id: e.target.value
                });

                getAvailableStock(
                  e.target.value
                );
              }}
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

            {/* SELL PRICE */}
            <input
              type="number"
              placeholder="Selling Price"
              value={form.selling_price}
              onChange={(e) =>
                setForm({
                  ...form,
                  selling_price: e.target.value
                })
              }
              className="border rounded-xl px-4 py-3"
              required
            />

            {/* RECEIVER */}
            <input
              type="text"
              placeholder="Receiver Name"
              value={form.receiver_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  receiver_name: e.target.value
                })
              }
              className="border rounded-xl px-4 py-3"
              required
            />

            {/* DEPARTMENT */}
            <input
              type="text"
              placeholder="Department"
              value={form.department}
              onChange={(e) =>
                setForm({
                  ...form,
                  department: e.target.value
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            {/* BUTTON */}
            <button
              disabled={
                Number(form.quantity) >
                available
              }
              className={`
                rounded-xl font-semibold text-white transition

                ${
                  Number(form.quantity) >
                  available
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
                }
              `}
            >
              Remove
            </button>

          </form>

          {/* AVAILABLE */}
          <div className="mb-6">

            <span className="text-slate-500 text-sm">
              Available Stock:
            </span>

            <span className="ml-2 text-green-600 font-bold">
              {available}
            </span>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-xl border">

            <table className="w-full min-w-[1200px]">

              <thead className="bg-slate-50">

                <tr>

                  <th className="p-4 text-left">
                    Product
                  </th>

                  <th className="p-4 text-left">
                    Qty
                  </th>

                  <th className="p-4 text-left">
                    Selling Price
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Receiver
                  </th>

                  <th className="p-4 text-left">
                    Department
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
                        key={item.stockout_id}
                        className="border-t hover:bg-slate-50"
                      >

                        {/* PRODUCT */}
                        <td className="p-4">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
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
                        <td className="p-4 text-red-600 font-bold">
                          -{item.quantity}
                        </td>

                        {/* PRICE */}
                        <td className="p-4">
                          $
                          {item.selling_price}
                        </td>

                        {/* AMOUNT */}
                        <td className="p-4 font-semibold">
                          ${item.amount}
                        </td>

                        {/* RECEIVER */}
                        <td className="p-4">
                          {item.receiver_name}
                        </td>

                        {/* DEPARTMENT */}
                        <td className="p-4">
                          {item.department}
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
                                  item.stockout_id
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
                        colSpan="8"
                        className="p-10 text-center text-slate-400"
                      >
                        No stock out records found
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

export default StockOut;