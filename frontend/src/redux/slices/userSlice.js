import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("user/getUsers", async (req, res) => {
  const response = await axios.post(
    "http://192.168.1.16:4000/api/user/register",
    req
  );
  return response.data;
});

export const signIn = createAsyncThunk("user/signIn", async (req, res) => {
  const response = await axios.post(
    "http://192.168.1.16:4000/api/user/login",
    req
  );
  return response.data;
});

export const refreshUser = createAsyncThunk(
  "user/refreshUser",
  async (req, res) => {
    axios.defaults.headers["authorization"] = "Bearer " + req;
    const response = await axios.get("http://192.168.1.16:4000/api/user");
    return response.data;
  }
);

export const getEmployees = createAsyncThunk(
  "user/getEmployees",
  async (req, res) => {
    const response = await axios.get(
      "http://192.168.1.16:4000/api/user/employees"
    );
    return response.data;
  }
);

const initialState = {
  loggedIn: false,
  admin: false,
  users: {
    admins: [],
    employees: [],
  },
  user: [],
  status: null,
  error: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      axios.defaults.headers["authorization"] = "";
      localStorage.removeItem("jwt");
      //window.location.reload();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "success";
        state.error = action.payload.errors;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(signIn.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "success";
        state.loggedIn = true;
        state.admin = action.payload.user.isAdmin;
        state.user = action.payload.user;
        localStorage.setItem("jwt", action.payload.jwt.token);
        axios.defaults.headers["authorization"] =
          "Bearer " + action.payload.jwt.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.admin = action.payload.user.isAdmin;
        state.error = [];
        localStorage.setItem("jwt", action.payload.jwt.token);
        axios.defaults.headers["authorization"] =
          "Bearer " + action.payload.jwt.token;
        state.loggedIn = true;
      })
      .addCase(refreshUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(refreshUser.rejected, (state, action) => {
        axios.defaults.headers["authorization"] = "";
        localStorage.removeItem("jwt");
        return initialState;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.status = "failed loading users";
      });
  },
});

export default slice.reducer;

export const { logout } = slice.actions;
