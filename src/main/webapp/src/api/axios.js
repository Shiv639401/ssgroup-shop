import axios from "axios";

/* ================= CREATE INSTANCE ================= */

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // change to true if using cookies
});

/* ================= REQUEST INTERCEPTOR ================= */

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // Auto logout on unauthorized
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      window.location.replace("/login");
    }

    // Optional: handle 403
    if (status === 403) {
      console.warn("Forbidden request");
    }

    return Promise.reject(error);
  }
);

export default api;