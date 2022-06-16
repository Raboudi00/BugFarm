import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";

//const Navigate = Navigate();

axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
};
const FETCH_URL = "http://192.168.1.16:4000/api/bug/mybugs";
const POST_URL = "http://192.168.1.16:4000/api/bug/";

export const fetchBugs = createAsyncThunk("bug/fetchBugs", async (req, res) => {
  const response = await axios.get(FETCH_URL);
  return response.data;
});

export const postBug = createAsyncThunk("bug/postBug", async (req, res) => {
  const response = await axios.post(POST_URL, req);
  return response.data;
});

export const updateBug = createAsyncThunk("bug/updateBug", async (req, res) => {
  const { _id } = req;
  const response = await axios.put(`${POST_URL}${_id}`, req);
  return response.data;
});

export const selectBug = createAsyncThunk("bug/selectBug", async (req, res) => {
  const response = await axios.get(`${POST_URL}${req}`);
  return response.data;
});

export const deleteBug = createAsyncThunk("bug/deleteBug", async (req, res) => {
  const response = await axios.delete(`${POST_URL}${req}`);
  return response.data;
});

const initialState = {
  bugs: [],
  bug: [],
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "bug",
  initialState,
  reducers: {
    getBugs: (state) => {},
    createBugs: (state, action) => {},
    updateBugs: (state, action) => {},
    isCompleted: (state) => {},
    // isCompleted: (state, action) => {
    //   const newState = state.bugs.map((bug) => {
    //     if (bug.id === action.payload) {
    //       let completed = bug.completed;
    //       return {
    //         ...bug,
    //         completed: !completed,
    //       };
    //     }
    //     return { ...bug };
    //   });
    //   state.bugs = [...newState];
    //   console.log(newState);
    // },
  },
  extraReducers: (builder) => {
    builder
      //Fetching Bugs
      .addCase(fetchBugs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBugs.fulfilled, (state, action) => {
        state.bugs = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(fetchBugs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //Posting Bug
      .addCase(postBug.fulfilled, (state, action) => {
        state.status = "success";
        state.bugs = [...state.bugs, action.payload];
        //window.location.href = "/";
        //<Navigate to="/view" replace={true} />;
      })
      .addCase(postBug.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postBug.rejected, (state, action) => {
        state.status = "rejected";
        state.error = [...action.error.message];
      })
      //Update Bug
      .addCase(updateBug.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateBug.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateBug.rejected, (state, action) => {
        state.status = "update rejected";
        console.log(action.error.message);
      })
      .addCase(selectBug.fulfilled, (state, action) => {
        state.bug = action.payload;
      })
      .addCase(selectBug.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(deleteBug.fulfilled, (state, action) => {
        state.status = "succeeded";
        window.location.href = "/";
      })
      .addCase(deleteBug.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default slice.reducer;

export const { getBugs, createBugs, updateBugs, isCompleted } = slice.actions;
