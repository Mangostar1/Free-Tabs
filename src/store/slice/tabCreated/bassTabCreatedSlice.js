import { createSlice } from '@reduxjs/toolkit';

const bassTabCreatedSlice = createSlice({
    name: 'bass',
    initialState: {},
    reducers: {
        addBassHTML: (state, action) => {
            const { id, type, content } = action.payload;
            state[id] = { type, content };
        },
    },
});

export const { addBassHTML } = bassTabCreatedSlice.actions;

export default bassTabCreatedSlice.reducer;