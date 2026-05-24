import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Search, Pencil, Trash2, Package } from "lucide-react";

function Product() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const API = "http://localhost:5000/api/products";

  const getProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, { name });
      setEditId(null);
    } else {
      await axios.post(API, { name });
    }

    setName("");
    getProducts();
  };

  const editProduct = (p) => {
    setName(p.name);
    setEditId(p.Product_id);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API}/${id}`);
    getProducts();
  };

  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex bg-slate-100 min-h-screen">

      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* MAIN */}
      <div className="flex-1 min-w-0 md:ml-72 p-3 sm:p-4 md:p-6">

        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Products</p>
            <h1 className="text-2xl font-bold">{products.length}</h1>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">Filtered</p>
            <h1 className="text-2xl font-bold">{filtered.length}</h1>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">System</p>
            <h1 className="text-2xl font-bold text-green-600">Active</h1>
          </div>

        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 md:p-6">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                Product Management
              </h2>
              <p className="text-sm text-slate-400">
                Manage all products in your system
              </p>
            </div>

            {/* SEARCH */}
            <div className="flex items-center bg-slate-100 px-3 py-2 rounded-xl w-full lg:w-80">
              <Search size={18} className="text-slate-400" />
              <input
                className="ml-2 w-full bg-transparent outline-none text-sm"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
          >
            <input
              className="border rounded-xl p-3 w-full"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className="bg-blue-600 text-white rounded-xl p-3 w-full sm:col-span-1">
              {editId ? "Update Product" : "Add Product"}
            </button>
          </form>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-xl border">

            <table className="w-full min-w-[520px]">

              <thead className="bg-slate-50">
                <tr className="text-left text-sm">
                  <th className="p-4">ID</th>
                  <th className="p-4">Product</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filtered.length > 0 ? (
                  filtered.map((p) => (
                    <tr key={p.Product_id} className="border-t hover:bg-slate-50">

                      <td className="p-4 text-sm">#{p.Product_id}</td>

                      <td className="p-4 flex items-center gap-2">
                        <Package size={16} />
                        <span className="font-medium">{p.name}</span>
                      </td>

                      <td className="p-4 text-right">

                        <button
                          onClick={() => editProduct(p)}
                          className="text-green-600 hover:text-green-700 mr-3"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => deleteProduct(p.Product_id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-slate-400">
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