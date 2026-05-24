import { BrowserRouter, Routes,  Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Component1 from "./pages/Component1";
import Component2 from "./pages/Component2";
import Component3 from "./pages/Component3";
import Report from "./pages/Report";
import Product from "./pages/Product";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";
import ReportStock from "./pages/ReportStock";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stockin" element={<StockIn />} />
        <Route path="/stockout" element={<StockOut />} />
        <Route path="/report-stock" element={<ReportStock />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/component1"
          element={
            <ProtectedRoute>
              <Component1 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/component2"
          element={
            <ProtectedRoute>
              <Component2 />
            </ProtectedRoute>
          }
        />

        <Route
          path="/component3"
          element={
            <ProtectedRoute>
              <Component3 />
            </ProtectedRoute>
          }
        />
         <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />

         <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;