import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      {/* 🔔 Global Toast */}
      <Toaster
        richColors
        position="top-right"
        closeButton
        expand
      />

      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🧭 Routes */}
      <AppRouter />

      {/* 🔻 Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
