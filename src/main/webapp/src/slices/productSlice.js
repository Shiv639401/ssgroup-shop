import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";   // ✅ FIXED

/* ================================
   FETCH ALL PRODUCTS
================================ */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 0, size = 12 } = params;
      const { data } = await api.get(`/products?page=${page}&size=${size}`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

/* ================================
   FETCH SINGLE PRODUCT
================================ */
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

/* ================================
   FETCH CATEGORIES
================================ */
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/categories");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

/* ================================
   CREATE PRODUCT
================================ */
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/products", productData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create product"
      );
    }
  }
);

/* ================================
   DELETE PRODUCT
================================ */
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    categories: [],
    selectedProduct: null,
    page: 0,
    size: 12,
    totalItems: 0,
    totalPages: 0,
    status: "idle",
    error: null,
  },

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = Array.isArray(action.payload)
          ? action.payload
          : action.payload.items || [];
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
