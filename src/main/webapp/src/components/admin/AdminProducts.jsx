import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import ProductTable from "../../components/admin/ProductTable";
import ProductFormModal from "../../components/admin/ProductFormModal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import { Button } from "../../components/ui/Button";
import { api } from "../../lib/api";
import { toast } from "sonner";

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [confirmDel, setConfirmDel] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/products?page=0&size=50&sort=newest");
      setItems(res.data?.items || []);
    } catch (e) {
      toast.error("Failed to load products ❌");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    // tumhare paas already category endpoint jo fetchCategories use karta hai
    // agar tumhara endpoint different hai to yahan adjust kar dena:
    try {
      const res = await api.get("/api/categories");
      setCategories(res.data || []);
    } catch {
      // fallback: empty
    }
  };

  useEffect(() => {
    load();
    loadCategories();
  }, []);

  const onCreate = async (payload) => {
    try {
      setLoading(true);
      await api.post("/api/products", payload);
      toast.success("Product created ✅");
      setOpenForm(false);
      await load();
    } catch (e) {
      toast.error("Create failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (payload) => {
    try {
      setLoading(true);
      await api.put(`/api/products/${editing.id}`, payload);
      toast.success("Product updated ✅");
      setOpenForm(false);
      setEditing(null);
      await load();
    } catch (e) {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`/api/products/${deleteTarget.id}`);
      toast.success("Product deleted ✅");
      setConfirmDel(false);
      setDeleteTarget(null);
      await load();
    } catch (e) {
      toast.error("Delete failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Products"
        subtitle="Add, edit, upload images, manage variants & pricing"
        right={
          <Button onClick={() => { setEditing(null); setOpenForm(true); }}>
            + Add Product
          </Button>
        }
      />

      {loading && <p className="text-sm text-muted">Loading...</p>}

      <ProductTable
        items={items}
        onEdit={(p) => { setEditing(p); setOpenForm(true); }}
        onDelete={(p) => { setDeleteTarget(p); setConfirmDel(true); }}
      />

      <ProductFormModal
        open={openForm}
        onOpenChange={setOpenForm}
        categories={categories}
        initial={editing}
        loading={loading}
        onSubmit={editing ? onUpdate : onCreate}
      />

      <ConfirmDialog
        open={confirmDel}
        onOpenChange={setConfirmDel}
        title="Delete product?"
        desc={`This will remove "${deleteTarget?.title}" permanently.`}
        onConfirm={onDelete}
      />
    </div>
  );
}