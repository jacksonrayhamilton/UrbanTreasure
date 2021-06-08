import { combineReducers, configureStore } from '@reduxjs/toolkit'

import gamesReducer from './gamesSlice'

const rootReducer = combineReducers({
  games: gamesReducer
})

export function createStore(initialState?: RootState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  })
}

export const store = createStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
