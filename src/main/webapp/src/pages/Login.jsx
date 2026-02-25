import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, accessToken } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");

  // ✅ SAVE TOKEN TO LOCAL STORAGE
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("token", accessToken);  // 🔥 IMPORTANT
      navigate("/");
    }
  }, [accessToken, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setFormError("All fields are required");
      return;
    }

    setFormError("");
    dispatch(login(formData));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Login to SSGroup 🚀
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {formError && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {formError}
            </p>
          )}

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;