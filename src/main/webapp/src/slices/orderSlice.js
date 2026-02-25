import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

/* ================= PLACE ORDER ================= */
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/orders", orderData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to place order"
      );
    }
  }
);

/* ================= FETCH USER ORDERS ================= */
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/orders");
      return Array.isArray(data) ? data : [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user orders"
      );
    }
  }
);

/* ================= FETCH ADMIN ORDERS ================= */
export const fetchAdminOrders = createAsyncThunk(
  "orders/fetchAdminOrders",
  async (params = {}, { rejectWithValue }) => {
    try {
      const {
        search = "",
        status = "",
        from = "",
        to = "",
        page = 0,
        size = 10,
      } = params;

      const { data } = await api.get("/admin/orders", {
        params: { search, status, from, to, page, size },
      });

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch admin orders"
      );
    }
  }
);

/* ================= UPDATE ORDER STATUS ================= */
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/admin/orders/${id}/status`,
        null,
        { params: { status } }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update order status"
      );
    }
  }
);

/* ================= FETCH ADMIN ORDER DETAILS ================= */
export const fetchAdminOrderDetails = createAsyncThunk(
  "orders/fetchAdminOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/admin/orders/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);

/* ================= FETCH REVENUE ================= */
export const fetchRevenue = createAsyncThunk(
  "orders/fetchRevenue",
  async (filter = "TODAY", { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/orders/revenue", {
        params: { filter },
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch revenue"
      );
    }
  }
);

/* ================= SLICE ================= */
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    userOrders: [],
    userStatus: "idle",
    userError: null,

    adminPage: null,
    adminStatus: "idle",
    adminError: null,

    filters: {
      search: "",
      status: "ALL",
      from: "",
      to: "",
      page: 0,
      size: 10,
    },

    selectedOrder: null,
    selectedStatus: "idle",
    selectedError: null,

    revenue: {
      todayRevenue: 0,
      monthRevenue: 0,
      totalRevenue: 0,
    },
    revenueStatus: "idle",
    revenueError: null,
  },

  reducers: {
    clearOrders: (state) => {
      state.userOrders = [];
      state.adminPage = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
      state.selectedStatus = "idle";
    },
    setAdminFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder

      /* PLACE ORDER */
      .addCase(placeOrder.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.userOrders.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.payload;
      })

      /* USER ORDERS */
      .addCase(fetchUserOrders.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.payload;
      })

      /* ADMIN ORDERS */
      .addCase(fetchAdminOrders.pending, (state) => {
        state.adminStatus = "loading";
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.adminStatus = "succeeded";
        state.adminPage = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.adminStatus = "failed";
        state.adminError = action.payload;
      })

      /* UPDATE STATUS */
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;

        if (state.adminPage?.content) {
          const index = state.adminPage.content.findIndex(
            (o) => o.id === updated.id
          );
          if (index !== -1) {
            state.adminPage.content[index] = updated;
          }
        }

        if (state.selectedOrder?.id === updated.id) {
          state.selectedOrder = updated;
        }
      })

      /* DETAILS */
      .addCase(fetchAdminOrderDetails.pending, (state) => {
        state.selectedStatus = "loading";
      })
      .addCase(fetchAdminOrderDetails.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        state.selectedOrder = action.payload;
      })
      .addCase(fetchAdminOrderDetails.rejected, (state, action) => {
        state.selectedStatus = "failed";
        state.selectedError = action.payload;
      })

      /* REVENUE */
      .addCase(fetchRevenue.pending, (state) => {
        state.revenueStatus = "loading";
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.revenueStatus = "succeeded";
        state.revenue = action.payload;
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.revenueStatus = "failed";
        state.revenueError = action.payload;
      });
  },
});

export const { clearOrders, clearSelectedOrder, setAdminFilters } =
  orderSlice.actions;

export default orderSlice.reducer;