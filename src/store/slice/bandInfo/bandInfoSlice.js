import { createSlice } from '@reduxjs/toolkit'

export const bandInfoSlice = createSlice({
    name: 'bandName',
    initialState: '',
    reducers: {
        addBandName: (state, action) => {
            return action.payload;
        },
    },
})

export const { addBandName } = bandInfoSlice.actions;

export default bandInfoSlice.reducer;