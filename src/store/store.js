import { configureStore } from '@reduxjs/toolkit'
import bassTabCreatedSlice from 'store/slice/tabCreated/bassTabCreatedSlice' 
import bandInfoSlice from 'store/slice/bandInfo/bandInfoSlice'
import bandSongInfoSlice from 'store/slice/bandInfo/bandSongInfoSlice'

export const store = configureStore({
    reducer: {
        bassTabCreated: bassTabCreatedSlice,
        bandInfo: bandInfoSlice,
        songBandInfo: bandSongInfoSlice,
    },
})