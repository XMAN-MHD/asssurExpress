// imports
import { createSlice} from '@reduxjs/toolkit';

// Set initial value of the slice
const initialState = {
    handleMenu : false
};

// Create the slice 
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.handleMenu = !state.handleMenu;
        }
    }
});

// export actions and reducer
export const {toggleMenu} = dashboardSlice.actions;
export default dashboardSlice.reducer;


