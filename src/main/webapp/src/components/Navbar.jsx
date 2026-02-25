import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, role, fullName } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/");
  };

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* LOGO */}
      <Link to="/" className="text-xl font-bold hover:text-yellow-400 transition">
        SSGroup 🛒
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-yellow-400 transition">
          Home
        </Link>

        <Link to="/products" className="hover:text-yellow-400 transition">
          Products
        </Link>

        <Link to="/cart" className="hover:text-yellow-400 transition">
          Cart
        </Link>

        {/* Admin Panel */}
        {accessToken && role === "ROLE_ADMIN" && (
          <Link
            to="/admin"
            className="text-yellow-400 font-semibold hover:scale-105 transition"
          >
            Admin Panel 👑
          </Link>
        )}

        {/* Customer Dropdown */}
        {accessToken ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded hover:bg-white/15 transition"
            >
              <span className="text-sm">👤</span>
              <span className="text-sm font-medium">{fullName || "Customer"}</span>
              <span className="text-xs text-gray-300">▼</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded-lg shadow-xl overflow-hidden z-50">
                <Link
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Orders
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-400 transition">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;