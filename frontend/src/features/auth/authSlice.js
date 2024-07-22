// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => await authService.logout()
);

// Function to safely parse JSON
const safeJSONParse = (item) => {
    try {
        return JSON.parse(item);
    } catch (error) {
        return null;
    }
};

// Async thunk to update profile
export const updateProfile = createAsyncThunk(
    'auth/update',
    async (userData, thunkAPI) => {
        try {
            const userID = thunkAPI.getState().auth.user._id;
            userData = {...userData, id: userID}
            return await authService.updateUser(userData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Async thunk to update password
export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async (passwordData, thunkAPI) => {
        try {
            let userID = thunkAPI.getState().auth.user._id;
            let userData = passwordData;
            userData = {...passwordData, id: userID}
            return await authService.updateUser(userData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Async thunk to send user email for resquesting a password reset
export const sendPasswordResetEmail = createAsyncThunk(
    'auth/forgotPassword',
    async (email, thunkAPI) => {
        try {
            return await authService.sendPasswordResetEmail(email);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Async thunk to reset password
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password, confirmPassword }, thunkAPI) => {
        try {
            return await authService.resetPassword(token, { password, confirmPassword });
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Save user data on the browser
const localuser = safeJSONParse(localStorage.getItem('user'));

// State
const initialState = {
    user: localuser ? localuser : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sendPasswordResetEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendPasswordResetEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(sendPasswordResetEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = 'Password reset successful';
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
