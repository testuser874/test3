import { configureStore } from '@reduxjs/toolkit';
import campaignsReducer from './campaignsSlice';
import filtersReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
