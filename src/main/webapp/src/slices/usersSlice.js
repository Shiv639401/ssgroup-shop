import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

/* ===============================
   FETCH ADMIN USERS
================================= */
export const fetchAdminUsers = createAsyncThunk(
  "users/fetchAdminUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/users");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

/* ===============================
   DELETE USER
================================= */
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/users/${id}`);
      return id; // return deleted user id
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

/* ===============================
   TOGGLE USER STATUS
================================= */
export const toggleUserStatus = createAsyncThunk(
  "users/toggleUserStatus",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/admin/users/${id}/toggle`);
      return data; // updated user
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update status"
      );
    }
  }
);

/* ===============================
   SLICE
================================= */
const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearUsers: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchAdminUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (user) => user.id !== action.payload
        );
      })

      /* TOGGLE STATUS */
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { clearUsers } = usersSlice.actions;

export default usersSlice.reducer;