import { useState } from "react";
import { adminApi } from "../../lib/adminApi";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await adminApi.post("/api/admin/bulk/products-csv", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setMsg(`Uploaded: ${res.data.uploaded}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bulk Upload (CSV)</h1>
      <input type="file" accept=".csv" onChange={(e)=>setFile(e.target.files[0])} />
      <button className="ml-3 bg-black text-white px-4 py-2 rounded" onClick={upload} disabled={!file}>
        Upload
      </button>
      {msg && <div className="mt-3 text-green-600">{msg}</div>}
    </div>
  );
}
