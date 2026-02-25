import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/Dialog";
import { Button } from "../ui/Button";
import ImageUploader from "./ImageUploader";
import VariantEditor from "./VariantEditor";

const emptyForm = () => ({
  title: "",
  description: "",
  categoryId: "",
  brandId: null,
  price: "",
  mrp: "",
  stock: 0,
  rating: 0,
  imageUrls: [],
  attributes: [],
  variants: [],
});

export default function ProductFormModal({
  open,
  onOpenChange,
  categories = [],
  initial,
  onSubmit,
  loading,
}) {
  const [form, setForm] = useState(emptyForm());

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        description: initial.description || "",
        categoryId: initial.categoryId || "",
        brandId: initial.brand?.id ?? null,
        price: initial.price || "",
        mrp: initial.mrp || "",
        stock: initial.stock ?? 0,
        rating: initial.rating ?? 0,
        imageUrls: initial.images || [],
        attributes: initial.attributes || [],
        variants: (initial.variants || []).map(v => ({
          sku: v.sku,
          mrp: v.mrp,
          price: v.price,
          stock: v.stock,
          isActive: v.isActive,
          options: v.options || [],
        })),
      });
    } else {
      setForm(emptyForm());
    }
  }, [initial, open]);

  const canSave = useMemo(() => {
    return (
      form.title.trim().length >= 3 &&
      form.description.trim().length >= 10 &&
      !!form.categoryId &&
      (form.imageUrls?.length || 0) >= 1
    );
  }, [form]);

  const submit = async () => {
    const payload = {
      categoryId: Number(form.categoryId),
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      mrp: Number(form.mrp),
      stock: Number(form.stock),
      rating: Number(form.rating || 0),
      brandId: form.brandId ? Number(form.brandId) : null,
      imageUrls: form.imageUrls,
      attributes: form.attributes,
      variants: (form.variants || []).map(v => ({
        sku: v.sku,
        mrp: Number(v.mrp),
        price: Number(v.price),
        stock: Number(v.stock),
        isActive: v.isActive ?? true,
        options: v.options || [],
      })),
    };

    await onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <h3 className="text-xl font-bold">
            {initial ? "Update Product" : "Add New Product"}
          </h3>
          <p className="text-sm text-muted mt-1">
            Create premium listings with images + variants.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-3">
            <input
              className="border rounded-xl px-3 py-2 w-full"
              placeholder="Product Title"
              value={form.title}
              onChange={(e) => setForm(s => ({ ...s, title: e.target.value }))}
            />
            <textarea
              className="border rounded-xl px-3 py-2 w-full min-h-[120px]"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm(s => ({ ...s, description: e.target.value }))}
            />

            <select
              className="border rounded-xl px-3 py-2 w-full"
              value={form.categoryId}
              onChange={(e) => setForm(s => ({ ...s, categoryId: e.target.value }))}
            >
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3">
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="MRP"
                value={form.mrp}
                onChange={(e) => setForm(s => ({ ...s, mrp: e.target.value }))}
              />
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm(s => ({ ...s, price: e.target.value }))}
              />
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm(s => ({ ...s, stock: e.target.value }))}
              />
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="Rating (0-5)"
                value={form.rating}
                onChange={(e) => setForm(s => ({ ...s, rating: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <ImageUploader
              value={form.imageUrls}
              onChange={(urls) => setForm(s => ({ ...s, imageUrls: urls }))}
            />

            <VariantEditor
              value={form.variants}
              onChange={(v) => setForm(s => ({ ...s, variants: v }))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={!canSave || loading}>
            {loading ? "Saving..." : (initial ? "Update" : "Create")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}