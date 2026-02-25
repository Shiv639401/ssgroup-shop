import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchHome = createAsyncThunk(
  "home/fetchHome",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/home");
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch home data");
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    trending: [],
    under499: [],
    flat30: [],
    brands: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trending = action.payload.trending;
        state.under499 = action.payload.under499;
        state.flat30 = action.payload.flat30;
        state.brands = action.payload.brands;
      });
  },
});

export default homeSlice.reducer;