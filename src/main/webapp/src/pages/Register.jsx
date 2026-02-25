import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, accessToken } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (accessToken) {
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

    if (!formData.fullName || !formData.email || !formData.password) {
      setFormError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    setFormError("");

    dispatch(
      register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })
    );
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
          width: "380px",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account 🚀
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
          />

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
            {status === "loading" ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default Register;
