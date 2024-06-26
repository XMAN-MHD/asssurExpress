import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import dashboardReducer from '../features/dash/dashSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer
  },
});
