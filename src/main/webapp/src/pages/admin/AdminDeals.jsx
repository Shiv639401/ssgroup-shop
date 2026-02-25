import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeals,
  createDeal,
  deleteDeal,
} from "../../slices/dealSlice";

const AdminDeals = () => {
  const dispatch = useDispatch();
  const { items: deals = [], status } = useSelector(
    (state) => state.deals
  );

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    type: "price-filter",
    value: "",
    active: true,
  });

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  /* ================= CREATE DEAL ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.slug || !form.value) {
      alert("All fields required ❌");
      return;
    }

    try {
      // 🔥 IMPORTANT FIX: convert config to JSON string
      const configData =
        form.type === "price-filter"
          ? { maxPrice: Number(form.value) }
          : { category: form.value };

      await dispatch(
        createDeal({
          title: form.title.trim(),
          slug: form.slug.trim(),
          type: form.type,
          active: form.active,
          config: JSON.stringify(configData), // ✅ FIXED
        })
      ).unwrap();

      alert("Deal Created Successfully ✅");

      dispatch(fetchDeals());

      setForm({
        title: "",
        slug: "",
        type: "price-filter",
        value: "",
        active: true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create deal ❌");
    }
  };

  /* ================= FILTER ================= */
  const filteredDeals = deals
    .filter((d) =>
      d.title?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((d) =>
      filterType === "all" ? true : d.type === filterType
    );

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">
        💸 Deals Management
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
        >
          <option value="all">All</option>
          <option value="price-filter">Price Filter</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* Create Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl mb-8 shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4">
          ➕ Create New Deal
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
          />

          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
          >
            <option value="price-filter">Price Filter</option>
            <option value="category">Category</option>
          </select>

          <input
            placeholder={
              form.type === "price-filter"
                ? "Max Price (e.g. 499)"
                : "Category Name"
            }
            value={form.value}
            onChange={(e) =>
              setForm({ ...form, value: e.target.value })
            }
            className="p-3 rounded bg-gray-800"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded font-bold"
        >
          Create Deal
        </button>
      </form>

      {/* Deals Table */}
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4">Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDeals.map((deal) => (
              <tr
                key={deal.id}
                className="border-t border-gray-700"
              >
                <td className="p-4">{deal.title}</td>
                <td>{deal.type}</td>
                <td>
                  {deal.active ? (
                    <span className="text-green-400">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-400">
                      Inactive
                    </span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() =>
                      dispatch(deleteDeal(deal.id)).then(() =>
                        dispatch(fetchDeals())
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredDeals.length === 0 && status !== "loading" && (
          <div className="p-6 text-gray-400">
            No deals found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDeals;