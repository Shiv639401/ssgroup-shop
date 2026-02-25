import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, fetchCategories } from "../../slices/productSlice";
import api from "../../api/axios";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    mrp: "",
    stock: "",
    rating: "",
    categoryId: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setImageFiles(files);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const uploadImages = async () => {
    if (!imageFiles.length) return null;

    const formData = new FormData();
    imageFiles.forEach((file) => formData.append("files", file));

    setUploading(true);
    try {
      const res = await api.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return Array.isArray(res.data) ? res.data : null;
    } catch (err) {
      alert(err.response?.data?.message || "Image upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryId) {
      alert("Please select category");
      return;
    }

    const imageUrls = await uploadImages();
    if (!imageUrls?.length) return;

    await dispatch(
      createProduct({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        mrp: Number(form.mrp),
        stock: Number(form.stock),
        rating: Number(form.rating || 0),
        categoryId: Number(form.categoryId),
        imageUrls,
      })
    );

    alert("✅ Product Added Successfully!");

    setForm({
      title: "",
      description: "",
      price: "",
      mrp: "",
      stock: "",
      rating: "",
      categoryId: "",
    });

    setImageFiles([]);
    setImagePreviews([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-10">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl text-white">

        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide">
          🛍️ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            name="title"
            value={form.title}
            placeholder="Product Title"
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
          />

          <textarea
            name="description"
            value={form.description}
            placeholder="Product Description"
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-5 py-4 rounded-2xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />

          <div className="grid grid-cols-2 gap-6">
            <input
              name="price"
              type="number"
              value={form.price}
              placeholder="Price"
              onChange={handleChange}
              required
              className="px-5 py-4 rounded-2xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <input
              name="mrp"
              type="number"
              value={form.mrp}
              placeholder="MRP"
              onChange={handleChange}
              required
              className="px-5 py-4 rounded-2xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <input
              name="stock"
              type="number"
              value={form.stock}
              placeholder="Stock"
              onChange={handleChange}
              required
              className="px-5 py-4 rounded-2xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <input
              name="rating"
              type="number"
              step="0.1"
              value={form.rating}
              placeholder="Rating (0-5)"
              onChange={handleChange}
              className="px-5 py-4 rounded-2xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>

          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl bg-white/20 text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="" className="text-black">
              Select Category
            </option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id} className="text-black">
                {cat.name}
              </option>
            ))}
          </select>

          <div>
            <label className="block mb-2 font-semibold text-gray-300">
              Upload Product Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
              className="file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700 transition"
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="preview"
                  className="h-28 w-full object-cover rounded-xl border border-white/20 hover:scale-105 transition"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-lg hover:scale-105 transition transform shadow-xl"
          >
            {uploading ? "Uploading..." : "Add Product 🚀"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminProducts;