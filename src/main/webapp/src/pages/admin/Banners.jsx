import { useEffect, useState } from "react";
import { adminApi } from "../../lib/adminApi";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({ title:"", imageUrl:"", redirectUrl:"", active:true, sortOrder:1 });

  const load = async () => {
    const res = await adminApi.get("/api/admin/banners");
    setBanners(res.data);
  };

  const create = async () => {
    await adminApi.post("/api/admin/banners", form);
    setForm({ title:"", imageUrl:"", redirectUrl:"", active:true, sortOrder:1 });
    load();
  };

  const del = async (id) => {
    await adminApi.delete(`/api/admin/banners/${id}`);
    load();
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Banners</h1>

      <div className="bg-white border rounded p-4 mb-4 grid grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Title"
          value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Image URL"
          value={form.imageUrl} onChange={(e)=>setForm({...form, imageUrl:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Redirect URL"
          value={form.redirectUrl} onChange={(e)=>setForm({...form, redirectUrl:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Sort Order"
          type="number" value={form.sortOrder}
          onChange={(e)=>setForm({...form, sortOrder:Number(e.target.value)})} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.active}
            onChange={(e)=>setForm({...form, active:e.target.checked})} />
          Active
        </label>
        <button className="bg-black text-white rounded px-4 py-2" onClick={create}>Create Banner</button>
      </div>

      <div className="bg-white border rounded">
        {banners.map((b)=>(
          <div key={b.id} className="p-4 border-b flex justify-between items-center">
            <div>
              <div className="font-semibold">{b.title}</div>
              <div className="text-xs text-gray-600">{b.imageUrl}</div>
            </div>
            <button className="text-red-600" onClick={()=>del(b.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
