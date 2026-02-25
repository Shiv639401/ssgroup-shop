import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setFullName } from "../slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { fullName, email } = useSelector((s) => s.auth);

  const [name, setName] = useState(fullName || "");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setName(fullName || "");
  }, [fullName]);

  const handleUpdate = async () => {
    setMsg("");
    setLoading(true);
    try {
      const res = await api.put("/users/me", { fullName: name });
      const updatedName = res.data?.fullName || name;

      dispatch(setFullName(updatedName));
      setMsg("✅ Profile updated successfully");
    } catch (e) {
      setMsg(e?.response?.data?.message || "❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            className="w-full border rounded px-3 py-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            className="w-full border rounded px-3 py-2 mt-1 bg-gray-50"
            value={email || ""}
            disabled
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading || !name.trim()}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {msg && <p className="text-sm mt-2">{msg}</p>}
      </div>
    </div>
  );
};

export default Profile;