import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface IOnScroll {
  value: number;
  page: string;
  registrationStep: number;
  userEmail: string;
}

const initialState: IOnScroll = {
  value: 0,
  page: "home",
  registrationStep: 1,
  userEmail: "",
};

export const onScrollSlice = createSlice({
  name: "onScroll",
  initialState,
  reducers: {
    setOnScroll: (state, action: PayloadAction<IOnScroll["value"]>) => {
      state.value = action.payload;
    },
    setPage: (state, action: PayloadAction<IOnScroll["page"]>) => {
      state.page = action.payload;
    },
  },
});

export const sendCode = createAsyncThunk(
  "user/sendCode",
  async (email: string, thunkAPI) => {
    try {
      const response = await fetch("/api/sendCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Export actions
export const { setOnScroll, setPage } = onScrollSlice.actions;

// Export reducer
export default onScrollSlice.reducer;
