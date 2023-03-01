import { configureStore } from '@reduxjs/toolkit'
import bassTabCreatedSlice from 'store/slice/tabCreated/bassTabCreatedSlice'
import guitarTabCreatedSlice from 'store/slice/tabCreated/guitarTabCreatedSlice' 
import bandInfoSlice from 'store/slice/bandInfo/bandInfoSlice'
import bandSongInfoSlice from 'store/slice/bandInfo/bandSongInfoSlice'

export const store = configureStore({
    reducer: {
        bassTabCreated: bassTabCreatedSlice,
        guitarTabCreated: guitarTabCreatedSlice,
        bandInfo: bandInfoSlice,
        songBandInfo: bandSongInfoSlice,
    },
})