import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const skuFrom = (name = "") => {
  const base = name.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").slice(0, 18);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${base || "SKU"}-${rand}`;
};

export default function ProductForm({ categories = [], onSubmit }) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const mapped = acceptedFiles.map((f) => Object.assign(f, { preview: URL.createObjectURL(f) }));
    setFiles((prev) => [...prev, ...mapped]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const previews = useMemo(() => files.map((f) => (
    <div key={f.preview} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <img src={f.preview} alt="preview" className="h-24 w-24 object-cover" />
      <button
        type="button"
        onClick={() => setFiles((p) => p.filter(x => x.preview !== f.preview))}
        className="absolute top-1 right-1 text-xs bg-black/60 px-2 py-1 rounded-xl hover:bg-black/80 transition"
      >
        Remove
      </button>
    </div>
  )), [files]);

  const handleAutoSku = () => setSku(skuFrom(name));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      sku: sku || skuFrom(name),
      price: Number(price),
      discount: Number(discount),
      stock: Number(stock),
      categoryId,
      images: files, // backend upload separately (FormData)
    };
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-4 border gold-border shadow-xl text-white">
      <div className="text-lg font-semibold gold-text">Add / Edit Product</div>
      <div className="text-[11px] text-white/50">Premium product editor</div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-xs text-white/70">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-yellow-300/40"
            placeholder="e.g. iPhone 15 Cover"
          />
        </div>

        <div>
          <label className="text-xs text-white/70">SKU</label>
          <div className="mt-1 flex gap-2">
            <input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-yellow-300/40"
              placeholder="Auto generate or type"
            />
            <button
              type="button"
              onClick={handleAutoSku}
              className="rounded-2xl px-3 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition text-xs"
            >
              Auto
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-white/70">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="mt-1 w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-yellow-300/40"
            placeholder="e.g. 999"
          />
        </div>

        <div>
          <label className="text-xs text-white/70">Discount %</label>
          <input
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            type="number"
            className="mt-1 w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-yellow-300/40"
            placeholder="e.g. 10"
          />
        </div>

        <div>
          <label className="text-xs text-white/70">Stock Quantity</label>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            className="mt-1 w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-yellow-300/40"
            placeholder="e.g. 50"
          />
        </div>

        <div>
          <label className="text-xs text-white/70">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-yellow-300/40"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-xs text-white/70">Images (Drag & Drop)</label>
        <div
          {...getRootProps()}
          className={`mt-1 rounded-2xl border border-dashed p-5 transition ${
            isDragActive ? "border-yellow-300/60 bg-yellow-300/10" : "border-white/15 bg-white/5"
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-sm text-white/80">
            {isDragActive ? "Drop images here..." : "Drag & drop images, or click to select"}
          </div>
          <div className="text-[11px] text-white/50 mt-1">Supports multiple images + instant preview</div>
        </div>

        {files.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {previews}
          </div>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        <button type="submit" className="rounded-2xl px-4 py-2 bg-yellow-300/20 border gold-border hover:bg-yellow-300/25 transition">
          Save Product
        </button>
        <button type="button" onClick={() => setFiles([])} className="rounded-2xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
          Clear Images
        </button>
      </div>
    </form>
  );
}