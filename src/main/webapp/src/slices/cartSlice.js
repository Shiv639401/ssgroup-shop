import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

/* ================= HELPER ================= */

const normalizeCart = (data) => ({
  items: data?.items || [],
  subtotal: data?.subtotal || 0,
  mrpTotal: data?.mrpTotal || 0,
});

/* ================= FETCH CART ================= */

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/cart");
      return normalizeCart(data);
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

/* ================= ADD TO CART ================= */

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/cart", { productId, quantity });
      return normalizeCart(data);
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to update cart"
      );
    }
  }
);

/* ================= REMOVE FROM CART ================= */

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      return normalizeCart(data);
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

/* ================= SLICE ================= */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    subtotal: 0,
    mrpTotal: 0,
    status: "idle",
    updating: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.mrpTotal = 0;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder

      /* ================= FETCH ================= */
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.mrpTotal = action.payload.mrpTotal;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* ================= ADD ================= */
      .addCase(addToCart.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.updating = false;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.mrpTotal = action.payload.mrpTotal;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      /* ================= REMOVE ================= */
      .addCase(removeFromCart.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.updating = false;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.mrpTotal = action.payload.mrpTotal;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;