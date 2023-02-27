import { createSlice } from '@reduxjs/toolkit';

const tabCreatedSlice = createSlice({
    name: 'html',
    initialState: {},
    reducers: {
        addHTML: (state, action) => {
            const { id, type, content } = action.payload;
            state[id] = { type, content };
        },
    },
});

export const { addHTML } = tabCreatedSlice.actions;

export default tabCreatedSlice.reducer;