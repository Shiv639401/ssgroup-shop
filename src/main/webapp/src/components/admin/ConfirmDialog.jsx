import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/Dialog";
import { Button } from "../ui/Button";

export default function ConfirmDialog({ open, onOpenChange, title, desc, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-lg font-bold">{title}</h3>
          {desc && <p className="text-sm text-muted mt-1">{desc}</p>}
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}