import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

/* Root */
export const DropdownMenu = DropdownMenuPrimitive.Root;

/* Trigger */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/* Content */
export const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 8, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[180px] rounded-xl border bg-white p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
);

DropdownMenuContent.displayName = "DropdownMenuContent";

/* Item */
export const DropdownMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none hover:bg-black/5",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);

DropdownMenuItem.displayName = "DropdownMenuItem";

/* Checkbox Item */
export const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg py-2 pl-8 pr-2 text-sm outline-none hover:bg-black/5",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
);

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

/* Sub */
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none hover:bg-black/5",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
);

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export const DropdownMenuSubContent = React.forwardRef(
  ({ className, sideOffset = 8, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[180px] rounded-xl border bg-white p-1 shadow-md",
        className
      )}
      {...props}
    />
  )
);

DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
