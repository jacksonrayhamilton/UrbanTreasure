import { combineReducers, configureStore } from '@reduxjs/toolkit'

import gamesReducer, {
  autoPersistGamesState,
  createInitialGamesState,
  restorePersistedGamesState
} from './gamesSlice'
import addressesReducer, {
  createInitialAddressesState
} from './addressesSlice'

const rootReducer = combineReducers({
  games: gamesReducer,
  addresses: addressesReducer
})

export function createStore(initialState?: RootState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  })
}

export const store = createStore(getPersistedRootState())
autoPersistGamesState(store)

export function createRootState(): RootState {
  return {
    games: createInitialGamesState(),
    addresses: createInitialAddressesState()
  }
}

function getPersistedRootState() {
  const rootState = createRootState()
  restorePersistedGamesState(rootState)
  return rootState
}

export type RootState = ReturnType<typeof rootReducer>
export type Store = typeof store
export type AppDispatch = typeof store.dispatch
