import { createSlice } from '@reduxjs/toolkit';

const guitarTabCreatedSlice = createSlice({
    name: 'guitar',
    initialState: {},
    reducers: {
        addGuitarHTML: (state, action) => {
            const { id, type, content } = action.payload;
            state[id] = { type, content };
        },
    },
});

export const { addGuitarHTML } = guitarTabCreatedSlice.actions;

export default guitarTabCreatedSlice.reducer;