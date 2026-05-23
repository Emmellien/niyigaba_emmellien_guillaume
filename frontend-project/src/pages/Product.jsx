import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Search,
  Pencil,
  Trash2,
  Package,
  DollarSign,
  Boxes
} from "lucide-react";

function Product() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const API = "http://localhost:5000/api/products";

  // GET PRODUCTS
  const getProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, {
          name,
          price
        });

        setEditId(null);
      } else {
        await axios.post(API, { name, price });
      }

      setName("");
      setPrice("");

      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const editProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setEditId(product.Product_id);
  };

  // DELETE
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex bg-slate-100 min-h-screen">
      
      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 md:ml-72 p-4 md:p-6">

        {/* HEADER */}
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Products
                </p>
                <h1 className="text-3xl font-bold text-slate-800 mt-2">
                  {products.length}
                </h1>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Boxes size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Available Items
                </p>
                <h1 className="text-3xl font-bold text-slate-800 mt-2">
                  {filteredProducts.length}
                </h1>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                <Package size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 sm:col-span-2 xl:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Product Value
                </p>
                <h1 className="text-3xl font-bold text-slate-800 mt-2">
                  $
                  {products
                    .reduce(
                      (acc, item) =>
                        acc + Number(item.price),
                      0
                    )
                    .toFixed(2)}
                </h1>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                <DollarSign size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN BOX */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6">

          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Product Management
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Manage all products easily
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
                placeholder="Search product..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="bg-transparent outline-none ml-2 w-full text-sm"
              />
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          >
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-3 font-semibold transition">
              {editId ? "Update Product" : "Add Product"}
            </button>
          </form>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">

            <table className="w-full min-w-[700px]">

              <thead className="bg-slate-50">
                <tr className="text-left">
                  <th className="p-4 text-sm font-semibold text-slate-500">
                    ID
                  </th>

                  <th className="p-4 text-sm font-semibold text-slate-500">
                    Product Name
                  </th>

                  <th className="p-4 text-sm font-semibold text-slate-500">
                    Price
                  </th>

                  <th className="p-4 text-sm font-semibold text-slate-500">
                    Created
                  </th>

                  <th className="p-4 text-sm font-semibold text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.Product_id}
                      className="border-t border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="p-4 text-sm text-slate-700">
                        #{product.Product_id}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Package size={18} />
                          </div>

                          <div>
                            <h2 className="font-semibold text-slate-800">
                              {product.name}
                            </h2>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-slate-700">
                        ${product.price}
                      </td>

                      <td className="p-4 text-sm text-slate-500">
                        {new Date(
                          product.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">

                          <button
                            onClick={() =>
                              editProduct(product)
                            }
                            className="w-10 h-10 rounded-xl bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() =>
                              deleteProduct(
                                product.Product_id
                              )
                            }
                            className="w-10 h-10 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-10 text-center text-slate-400"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;