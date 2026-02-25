import React from "react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "./Toast";
import { useToast } from "./Use-toast";

export function Toaster() {
  const { toasts, setToasts } = useToast();

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          open={t.open}
          onOpenChange={(open) => {
            if (!open) setToasts((prev) => prev.map(x => (x.id === t.id ? { ...x, open } : x)));
          }}
        >
          <div className="grid gap-1">
            {t.title ? <ToastTitle>{t.title}</ToastTitle> : null}
            {t.description ? <ToastDescription>{t.description}</ToastDescription> : null}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
