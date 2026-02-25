export const toDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const getOrderAmount = (o) =>
  Number(
    o?.totalAmount ??
      o?.total ??
      o?.subtotal ??
      o?.amount ??
      o?.totalPrice ??
      0
  ) || 0;

// group daily for last N days
export const dailySeries = (orders = [], days = 30) => {
  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - (days - 1));

  const map = new Map();
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    map.set(key, { date: key, orders: 0, revenue: 0 });
  }

  orders.forEach((o) => {
    const d = toDate(o?.createdAt || o?.orderDate || o?.date || o?.created_on);
    if (!d) return;
    const key = d.toISOString().slice(0, 10);
    if (!map.has(key)) return;
    const row = map.get(key);
    row.orders += 1;
    row.revenue += getOrderAmount(o);
    map.set(key, row);
  });

  return Array.from(map.values());
};

// group monthly for last 12 months
export const monthlySeries = (orders = [], months = 12) => {
  const now = new Date();
  const map = new Map();

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    map.set(key, { month: key, orders: 0, revenue: 0 });
  }

  orders.forEach((o) => {
    const d = toDate(o?.createdAt || o?.orderDate || o?.date || o?.created_on);
    if (!d) return;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!map.has(key)) return;
    const row = map.get(key);
    row.orders += 1;
    row.revenue += getOrderAmount(o);
    map.set(key, row);
  });

  return Array.from(map.values());
};

export const pctChange = (current, previous) => {
  const c = Number(current) || 0;
  const p = Number(previous) || 0;
  if (p === 0) return c === 0 ? 0 : 100;
  return ((c - p) / p) * 100;
};