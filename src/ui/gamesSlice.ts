import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState, Store } from './store'

import { Game } from './types'
import * as API from './API'

type ClueAddresses = Record<string, string[]>

interface GamesState {
  defaultGame: Game | void
  currentGame: Game | void
  games: Record<string, Game>
  clueAddresses: ClueAddresses
}

const initialState = createInitialGamesState()

export function createInitialGamesState(): GamesState {
  return {
    defaultGame: undefined,
    currentGame: undefined,
    games: {},
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

export const fetchGame =
  createAsyncThunk('games/fetchGame', async (id: string | void) => {
    const response = await API.fetchGame(id)
    return response.data
  })

export const createGame =
  createAsyncThunk('games/createGame', async () => {
    const response = await API.createGame()
    return response.data
  })

interface UpdateCluesAction {
  gid: string
  address: string
}

export const updateClues =
  createAsyncThunk<any, UpdateCluesAction, { state: RootState }>(
    'games/updateClues',
    async ({ gid, address }: UpdateCluesAction, thunkAPI) => {
      const state = thunkAPI.getState()
      const clueAddresses = [...(state.games.clueAddresses[gid] || []), address]
      const response = await API.fetchClues(gid, clueAddresses)
      return response.data
    }
  )

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setDefaultGame(state, action) { state.defaultGame = action.payload },
    setCurrentGame(state, action) { state.currentGame = action.payload }
  },
  extraReducers(builder) {
    builder.addCase(fetchGame.fulfilled, (state, action) => {
      const { game } = action.payload
      const { id } = game
      state.games[id] = game
    })
    builder.addCase(createGame.fulfilled, (state, action) => {
      const { game } = action.payload
      const { id } = game
      state.games[id] = game
    })
    builder.addCase(updateClues.fulfilled, (state, action) => {
      const { game, clueAddresses } = action.payload
      const { id } = game
      Object.assign(state.games[id], game)
      state.clueAddresses[id] = clueAddresses
    })
  }
})

export const { setDefaultGame, setCurrentGame } = gamesSlice.actions

export const selectDefaultGame = (state: RootState) => state.games.defaultGame
export const selectCurrentGame = (state: RootState) => state.games.currentGame

export default gamesSlice.reducer
