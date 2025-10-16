import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Placeholder for synchronous actions
  },
  extraReducers: (builder) => {
    // Placeholder for asynchronous actions handled by createAsyncThunk
  },
});

export const { } = authSlice.actions;
export default authSlice.reducer;
