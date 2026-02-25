import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import {
  fetchAdminUsers,
  deleteUser,
  toggleUserStatus,
} from "../../slices/usersSlice";

const AdminUsers = () => {
  const dispatch = useDispatch();

  const { items: users, status, error } = useSelector(
    (state) => state.users
  );

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  /* ================= DELETE USER ================= */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  /* ================= TOGGLE STATUS ================= */
  const handleToggleStatus = (id) => {
    dispatch(toggleUserStatus(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white p-6 md:p-10">
      <h1 className="text-3xl font-semibold text-yellow-400 mb-8">
        Users Management 👥
      </h1>

      {/* Loading */}
      {status === "loading" && (
        <div className="text-center text-white/60">Loading users...</div>
      )}

      {/* Error */}
      {status === "failed" && (
        <div className="text-center text-red-400">{error}</div>
      )}

      {/* Empty State */}
      {status === "succeeded" && users.length === 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center">
          <p className="text-white/60">No users found.</p>
        </div>
      )}

      {/* Table */}
      {users.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-medium">
                      {user.name || "N/A"}
                    </td>

                    <td className="p-4 text-white/70">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "ROLE_ADMIN"
                            ? "bg-yellow-400 text-black"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* CLICKABLE STATUS */}
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`px-3 py-1 rounded-full text-xs transition ${
                          user.active
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        }`}
                      >
                        {user.active ? "Active" : "Blocked"}
                      </button>
                    </td>

                    {/* Delete */}
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;