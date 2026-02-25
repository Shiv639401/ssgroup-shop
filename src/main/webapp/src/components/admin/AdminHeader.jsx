import React from "react";
import { Badge } from "../ui/badge"; // agar tumhara Badge component path different ho to adjust
import { toast } from "sonner";

export default function AdminHeader({ title, subtitle, right }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
          <Badge className="bg-black text-white">ADMIN</Badge>
        </div>
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  );
}