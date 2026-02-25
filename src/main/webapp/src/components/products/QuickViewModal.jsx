import React from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Badge } from "../ui/badge";

export default function QuickViewModal({ open, onOpenChange, product }) {
  const dispatch = useDispatch();

  if (!product) return null;

  const imageUrl = product?.images?.length ? product.images[0] : null;
  const stock = typeof product.stock === "number" ? product.stock : 999; // fallback
  const rating = product?.rating ?? null;

  const handleAdd = () => {
    if (stock === 0) {
      toast.error("Out of stock ❌");
      return;
    }
    dispatch(addToCart(product));
    toast.success("Added to cart ✅");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription className="text-muted">
            Quick view — no page navigation
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden bg-gray-100 border">
            {imageUrl ? (
              <img src={imageUrl} alt={product.title} className="w-full h-80 object-cover" />
            ) : (
              <div className="w-full h-80 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">₹ {product.price}</Badge>
              {rating != null && <Badge variant="outline">⭐ {rating}</Badge>}
              <Badge variant={stock === 0 ? "secondary" : "default"}>
                {stock === 0 ? "Out of stock" : "In stock"}
              </Badge>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              {product.description || "Premium product with amazing features."}
            </p>

            <div className="mt-6 flex gap-3">
              <Button onClick={handleAdd} disabled={stock === 0}>
                Add to cart
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
