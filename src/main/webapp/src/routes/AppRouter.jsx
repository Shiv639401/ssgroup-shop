import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ===== PUBLIC PAGES ===== */
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

/* ===== USER PAGES ===== */
import Cart from "../pages/cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";

/* ===== ADMIN PAGES ===== */
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminOrderDetails from "../pages/admin/AdminOrderDetails";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import AdminDeals from "../pages/admin/AdminDeals";
import AdminPerformanceDashboard from "../pages/admin/AdminPerformanceDashboard";

/* ===== ROUTE GUARDS ===== */
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

/* ===== SLICE ===== */
import { fetchCategories } from "../slices/productSlice";

function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-grow mx-auto max-w-7xl w-full px-4 py-6">
        <Routes>

          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= USER PROTECTED ================= */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetails />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="performance" element={<AdminPerformanceDashboard />} />
            <Route path="deals" element={<AdminDeals />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          {/* ================= 404 ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default AppRouter;