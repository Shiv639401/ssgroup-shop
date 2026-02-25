import * as React from "react";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 4000;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const ToastContext = React.createContext(null);

export function ToastProviderLocal({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const toast = React.useCallback(({ title, description }) => {
    const id = genId();
    setToasts((prev) => {
      const next = [{ id, title, description, open: true }, ...prev];
      return next.slice(0, TOAST_LIMIT);
    });

    setTimeout(() => {
      setToasts((prev) => prev.map(t => (t.id === id ? { ...t, open: false } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 400);
    }, TOAST_REMOVE_DELAY);

    return { id };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProviderLocal");
  return ctx;
}
