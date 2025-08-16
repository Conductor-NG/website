import { configureStore } from "@reduxjs/toolkit";
import { onScrollSlice } from "./slices/onSrcollSlice";

export const store = configureStore({
  reducer: {
    onScrollSlice: onScrollSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
