import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    chat: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const RootState = store.getState;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const AppDispatch = store.dispatch;
