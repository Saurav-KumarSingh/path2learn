import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../appwrite/db";
import { Query } from "appwrite";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

// ✅ Fetch profile by userId
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await db.userProfile.list([
        Query.equal("userId", userId),
      ]);
      return res.documents[0] || null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Update profile
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await db.userProfile.update(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default profileSlice.reducer;
