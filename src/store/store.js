import { configureStore } from '@reduxjs/toolkit'
import tabCreatedSlice from 'store/slice/tabCreated/tabCreatedSlice' 
import counterSlice from 'store/slice/counter/counterSlice'

export const store = configureStore({
    reducer: {
        tabCreated: tabCreatedSlice,
        counter: counterSlice,
    },
})