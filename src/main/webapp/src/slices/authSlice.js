import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

/* SAFE LOCAL STORAGE LOAD */
const loadAuthFromStorage = () => {
  try {
    const data = localStorage.getItem("ssg_auth");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Invalid localStorage auth data");
    return null;
  }
};

const saved = loadAuthFromStorage();

/* LOGIN */
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

/* REGISTER */
export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    accessToken: saved?.accessToken || null,
    refreshToken: saved?.refreshToken || null,
    role: saved?.role || null,
    email: saved?.email || null,
    fullName: saved?.fullName || null,
    status: "idle",
    error: null,
  },

  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.email = null;
      state.fullName = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("ssg_auth");
    },

    // ✅ for profile update (navbar name update)
    setFullName(state, action) {
      state.fullName = action.payload;

      try {
        const old = localStorage.getItem("ssg_auth");
        if (old) {
          const data = JSON.parse(old);
          data.fullName = action.payload;
          localStorage.setItem("ssg_auth", JSON.stringify(data));
        }
      } catch (e) {
        // ignore storage error
      }
    },
  },

  extraReducers: (builder) => {
    builder
      /* LOGIN */
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        const payload = action.payload;

        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.role = payload.role;
        state.email = payload.email;
        state.fullName = payload.fullName;

        localStorage.setItem("ssg_auth", JSON.stringify(payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      })

      /* REGISTER */
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        const payload = action.payload;

        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.role = payload.role;
        state.email = payload.email;
        state.fullName = payload.fullName;

        localStorage.setItem("ssg_auth", JSON.stringify(payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout, setFullName } = authSlice.actions;
export default authSlice.reducer;