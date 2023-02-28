import { createSlice } from '@reduxjs/toolkit'

export const songBandInfoSlice = createSlice({
    name: 'songBandName',
    initialState: '',
    reducers: {
        addSongBandName: (state, action) => {
            return action.payload;
        },
    },
})

export const { addSongBandName } = songBandInfoSlice.actions;

export default songBandInfoSlice.reducer;