import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/Dropdown-menu";
import { Button } from "../ui/Button";

const options = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating_desc", label: "Rating: High → Low" },
];

export default function SortBar({ sort, onChange, total }) {
  const current = options.find((o) => o.value === sort)?.label || "Sort";

  return (
    <div className="bg-white border rounded-2xl shadow-card p-3 flex items-center justify-between">
      <p className="text-sm text-muted">
        Showing <span className="font-semibold text-primary">{total}</span> items
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{current}</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {options.map((o) => (
            <DropdownMenuItem key={o.value} onSelect={() => onChange(o.value)}>
              {o.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
