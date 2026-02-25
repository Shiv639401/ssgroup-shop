import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

/* ================= FETCH DEALS (PUBLIC) ================= */
export const fetchDeals = createAsyncThunk(
  "deals/fetchDeals",
  async (_, { rejectWithValue }) => {
    try {
      // ✅ PUBLIC ENDPOINT
      const { data } = await api.get("/deals");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch deals"
      );
    }
  }
);

/* ================= ADMIN ONLY ================= */
export const createDeal = createAsyncThunk(
  "deals/createDeal",
  async (dealData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin/deals", dealData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create deal"
      );
    }
  }
);

export const deleteDeal = createAsyncThunk(
  "deals/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/deals/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete deal"
      );
    }
  }
);

const dealSlice = createSlice({
  name: "deals",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || [];
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (deal) => deal.id !== action.payload
        );
      });
  },
});

export default dealSlice.reducer;