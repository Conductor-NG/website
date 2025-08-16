import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOnScroll {
  value: number;
  page: string;
}

const initialState: IOnScroll = {
  value: 0,
  page: "home",
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

// Export actions
export const { setOnScroll, setPage } = onScrollSlice.actions;

// Export reducer
export default onScrollSlice.reducer;
