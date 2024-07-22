// imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashService from './dashService';

// Async thunk to fetch policies
export const getPolicies = createAsyncThunk(
    'dashboard/policies',
    async (user, thunkAPI) => {
        try {
            return await dashService.getPolicies(user);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Set initial value of the slice
const initialState = {
    handleMenu: false,
    policies: {
        data: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: ''
    }
};

// Create the slice
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.handleMenu = !state.handleMenu;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPolicies.pending, (state) => {
                state.policies.isLoading = true;
                state.policies.isSuccess = false;
                state.policies.isError = false;
            })
            .addCase(getPolicies.fulfilled, (state, action) => {
                state.policies.isLoading = false;
                state.policies.isSuccess = true;
                state.policies.data = action.payload;
            })
            .addCase(getPolicies.rejected, (state, action) => {
                state.policies.isLoading = false;
                state.policies.isError = true;
                state.policies.message = action.payload;
                state.policies.data = [];
            })
    },
});

// Export actions and reducer
export const { toggleMenu } = dashboardSlice.actions;
export default dashboardSlice.reducer;
