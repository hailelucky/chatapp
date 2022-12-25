import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    chat: null,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const RootState = store.getState;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const AppDispatch = store.dispatch;
