import { api } from "./api";

export async function uploadProductImage(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await api.post("/api/products/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data; // url string
}