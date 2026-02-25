import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";   // ✅ FIXED

// ================================
// LOAD WISHLIST
// ================================
export const loadWishlist = createAsyncThunk(
  "wishlist/load",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/wishlist");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load wishlist"
      );
    }
  }
);

// ================================
// TOGGLE WISHLIST
// ================================
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      await api.post(`/wishlist/${productId}/toggle`);
      dispatch(loadWishlist());
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update wishlist"
      );
    }
  }
);

// ================================
// SLICE
// ================================
const slice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default slice.reducer;
