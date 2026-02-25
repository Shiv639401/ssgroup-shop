import React, { useRef, useState } from "react";
import { uploadProductImage } from "../../lib/upload";
import { toast } from "sonner";
import { Button } from "../ui/Button";

export default function ImageUploader({ value = [], onChange, max = 6 }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const addFiles = async (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    if (value.length >= max) return toast.error(`Max ${max} images allowed`);

    try {
      setUploading(true);
      const urls = [];
      for (const file of list) {
        const url = await uploadProductImage(file);
        urls.push(url);
      }
      onChange([...(value || []), ...urls].slice(0, max));
      toast.success("Image uploaded ✅");
    } catch (e) {
      toast.error("Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  const removeAt = (idx) => {
    const next = [...value];
    next.splice(idx, 1);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Images"}
        </Button>
        <p className="text-xs text-muted">JPG/PNG/WebP • Max {max}</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {(value || []).map((url, idx) => (
          <div key={url + idx} className="relative rounded-xl overflow-hidden border">
            <img src={url} alt="uploaded" className="h-20 w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(idx)}
              className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}