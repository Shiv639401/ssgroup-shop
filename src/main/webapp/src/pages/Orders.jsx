import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setErrMsg("");
    setLoading(true);

    try {
      const res = await api.get("/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      const status = err?.response?.status;
      if (status === 401) setErrMsg("Unauthorized: Please login again.");
      else if (status === 403) setErrMsg("Forbidden: Token invalid/expired or not sent.");
      else setErrMsg("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const doAction = async (orderId, action) => {
    try {
      await api.put(`/orders/${orderId}/${action}`);
      await fetchOrders();
    } catch (err) {
      alert(err?.response?.data?.message || `Failed to ${action} order`);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  if (errMsg) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
        <h2>{errMsg}</h2>
        <button onClick={fetchOrders} style={{ marginTop: 12, padding: "8px 14px" }}>
          Retry
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>No Orders Yet 📦</h2>
        <p>Start shopping to place your first order.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Your Orders 📦</h1>

      {orders.map((order) => {
        const canCancel = ["CREATED", "PAID", "PACKED"].includes(order.status);
        const canReturn = order.status === "DELIVERED";
        const canReplace = order.status === "DELIVERED";

        return (
          <div key={order.id} style={orderCard}>
            <div style={orderHeader}>
              <div>
                <h3>Order ID: {order.id}</h3>
                <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</p>

                {order.trackingNumber && (
                  <p style={{ marginTop: 6 }}>
                    Tracking: <b>{order.trackingNumber}</b>
                  </p>
                )}
              </div>

              <StatusBadge status={order.status} />
            </div>

            <div style={{ marginTop: "15px" }}>
              {order.items?.map((item) => (
                <div key={item.id} style={productRow}>
                  <span>
                    {item.product?.title} × {item.quantity}
                  </span>
                  <span>₹ {item.unitPrice}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {canCancel && (
                <button
                  onClick={() => doAction(order.id, "cancel")}
                  style={btnRed}
                >
                  Cancel Order
                </button>
              )}

              {canReturn && (
                <button
                  onClick={() => doAction(order.id, "return")}
                  style={btnGray}
                >
                  Return
                </button>
              )}

              {canReplace && (
                <button
                  onClick={() => doAction(order.id, "replace")}
                  style={btnBlack}
                >
                  Replace
                </button>
              )}
            </div>

            <div style={orderFooter}>
              <h3>Total: ₹ {order.total}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const colors = {
    CREATED: "gray",
    PAID: "blue",
    PACKED: "purple",
    SHIPPED: "orange",
    DELIVERED: "green",
    CANCELLED: "red",

    RETURN_REQUESTED: "black",
    RETURN_APPROVED: "black",
    RETURNED: "black",

    REPLACEMENT_REQUESTED: "black",
    REPLACEMENT_APPROVED: "black",
    REPLACED: "black",
  };

  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "20px",
        backgroundColor: colors[status] || "gray",
        color: "white",
        fontSize: "14px",
      }}
    >
      {status}
    </span>
  );
};

const orderCard = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  marginTop: "20px",
};

const orderHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const productRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #eee",
};

const orderFooter = {
  marginTop: "15px",
  textAlign: "right",
};

const btnRed = {
  padding: "8px 12px",
  background: "#ef4444",
  color: "white",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
};

const btnGray = {
  padding: "8px 12px",
  background: "#111827",
  color: "white",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
};

const btnBlack = {
  padding: "8px 12px",
  background: "#000",
  color: "white",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
};

export default Orders;