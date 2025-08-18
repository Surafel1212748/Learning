import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import analyticsSlice from "./analytics/analyticsSlice";
import coursesSlice from "./courses/coursesSlice";
import discussion_boardsSlice from "./discussion_boards/discussion_boardsSlice";
import enrollmentsSlice from "./enrollments/enrollmentsSlice";
import instructorsSlice from "./instructors/instructorsSlice";
import studentsSlice from "./students/studentsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
analytics: analyticsSlice,
courses: coursesSlice,
discussion_boards: discussion_boardsSlice,
enrollments: enrollmentsSlice,
instructors: instructorsSlice,
students: studentsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
