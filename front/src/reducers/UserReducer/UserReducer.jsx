import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: null,
        username: null,
        email: null,
    },
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        setUserName: (state, action) => {
            state.name = action.payload;
        },
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;