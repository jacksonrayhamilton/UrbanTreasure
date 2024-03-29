import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState, Store } from './store'

import { fillHoles } from '../js/util'
import { parseGameQuery } from './util'
import { Game } from './types'
import * as API from './API'

type ClueAddresses = Record<string, string[]>

interface GamesState {
  defaultGame: Game | void
  games: Record<string, Game>
  responses: Record<string, Game>
  isFetching: Record<string, boolean>
  clueAddresses: ClueAddresses
}

const initialState = createInitialGamesState()

export function createInitialGamesState(): GamesState {
  return {
    defaultGame: undefined,
    games: {},
    responses: {},
    isFetching: {},
    clueAddresses: {}
  }
}

export function autoPersistGamesState(store: Store) {
  let clueAddresses: ClueAddresses
  store.subscribe(() => {
    const state = store.getState()
    if (clueAddresses === state.games.clueAddresses) return
    clueAddresses = state.games.clueAddresses
    localStorage.setItem(
      'UrbanTreasure/games.clueAddresses',
      JSON.stringify(clueAddresses)
    )
  })
}

export function restorePersistedGamesState(state: RootState) {
  const clueAddresses =
    localStorage.getItem('UrbanTreasure/games.clueAddresses')
  if (clueAddresses) state.games.clueAddresses = JSON.parse(clueAddresses)
  return state
}

export const fetchDefaultGame =
  createAsyncThunk<any, void, { state: RootState }>(
    'games/fetchDefaultGame', async (_, { dispatch }) => {
      dispatch(setFetching({ query: 'default' }))
      const response = await API.fetchLatestGame()
      return response.data
    }
  )

export const fetchGame =
  createAsyncThunk<any, string, { state: RootState }>(
    'games/fetchGame', async (query, { dispatch, getState }) => {
      dispatch(setFetching({ query }))
      const { id } = parseGameQuery(query)
      const { games: { clueAddresses: clueAddressesMap } } = getState()
      const clueAddresses = id ? clueAddressesMap[id] : undefined
      const response = await API.fetchGame(query, clueAddresses)
      return { ...response.data, query }
    }
  )

export const createGame =
  createAsyncThunk('games/createGame', async () => {
    const response = await API.createGame()
    return response.data
  })

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setFetching(state, action) {
      const { query } = action.payload
      state.isFetching[query] = true
    },
    updateClues(state, action) {
      const { gid, clue, address } = action.payload
      state.games[gid].clues[clue.index] = clue.clue
      fillHoles(state.games[gid].clues)
      state.clueAddresses[gid] = state.clueAddresses[gid] || []
      state.clueAddresses[gid].push(address)
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchDefaultGame.fulfilled, (state, action) => {
      const { game } = action.payload
      state.defaultGame = game
    })
    builder.addCase(fetchGame.fulfilled, (state, action) => {
      const { query, game } = action.payload
      const { id } = game
      if (!state.games[id]) state.games[id] = game
      state.responses[query] = game
    })
    builder.addCase(createGame.fulfilled, (state, action) => {
      const { game } = action.payload
      const { id } = game
      state.games[id] = game
      state.responses[id] = game
    })
  }
})

const { setFetching } = gamesSlice.actions
export const { updateClues } = gamesSlice.actions

export const selectDefaultGame = (state: RootState) => state.games.defaultGame

export default gamesSlice.reducer
