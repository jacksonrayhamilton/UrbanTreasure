import { configureStore } from '@reduxjs/toolkit'

import latestGameReducer from './latestGameSlice'

export const store = configureStore({
  reducer: {
    latestGame: latestGameReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
