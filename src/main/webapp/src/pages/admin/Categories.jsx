import { useEffect, useState } from "react";
import { adminApi } from "../../lib/adminApi";

export default function Categories() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await adminApi.get("/api/admin/categories");
    setList(res.data);
  };

  const add = async () => {
    await adminApi.post("/api/admin/categories", { name });
    setName("");
    load();
  };

  const del = async (id) => {
    await adminApi.delete(`/api/admin/categories/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="flex gap-2 mb-4">
        <input className="border p-2 rounded w-80"
          value={name} onChange={(e)=>setName(e.target.value)}
          placeholder="Category name" />
        <button className="bg-black text-white px-4 rounded" onClick={add}>Add</button>
      </div>

      <div className="bg-white border rounded">
        {list.map((c) => (
          <div key={c.id} className="p-4 border-b flex justify-between">
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-gray-600">Slug: {c.slug}</div>
            </div>
            <button className="text-red-600" onClick={()=>del(c.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
