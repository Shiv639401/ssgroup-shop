import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ add this
import { store } from "./app/store";

import AppRouter from "./routes/AppRouter";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        {/* ✅ Toast Container */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#000",
              color: "#fff",
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);