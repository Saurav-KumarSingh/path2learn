import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account } from "../appwrite/config";
import db from "../appwrite/db";
import { ID, Permission, Role } from "appwrite";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ Register user
// ✅ Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      // 1️⃣ Create Appwrite Account
      const user = await account.create(ID.unique(), email, password, name);

      // 2️⃣ Auto login (create session)
      await account.createEmailPasswordSession(email, password);

      // 3️⃣ Create default user profile in DB
      await db.userProfile.create(
  {
    userId: user.$id,
    name,
    email,
    avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    bio: "",
    createdAt: new Date().toISOString(),
  },
  [
    Permission.read(Role.user(user.$id)),
    Permission.update(Role.user(user.$id)),
    Permission.delete(Role.user(user.$id)),
  ],
  ID.unique()
);


      // 4️⃣ Send verification email
      await account.createVerification(import.meta.env.VITE_APPWRITE_VERIFICATION_URL );

      // 5️⃣ Return logged-in user object
      return await account.get();
    } catch (error) {
      console.error("Signup Error:", error);
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

// ✅ Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Logout user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    await account.deleteSession("current");
  }
);

// ✅ Get current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await account.get();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
