import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

import * as API from './API'

interface Game {
  id: string
  clues: string[],
  addresses: string[]
}

interface GamesState {
  defaultGame: Game | void
  currentGame: Game | void
  games: Record<string, Game>
}

const initialState: GamesState = {
  defaultGame: undefined,
  currentGame: undefined,
  games: {}
}

export const fetchGame =
  createAsyncThunk('games/fetchGame', async (id: string | void) => {
    const response = await API.fetchGame(id)
    return response.data
  })

export const startNewGame =
  createAsyncThunk('games/startNewGame', async () => {
    const response = await API.createGame()
    return response.data
  })

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setDefaultGame (state, action) { state.defaultGame = action.payload },
    setCurrentGame (state, action) { state.currentGame = action.payload }
  },
  extraReducers (builder) {
    builder.addCase(fetchGame.fulfilled, (state, action) => {
      const { game } = action.payload
      const { id } = game
      state.games[id] = game
    })
    builder.addCase(startNewGame.fulfilled, (state, action) => {
      const { game } = action.payload
      const { id } = game
      state.games[id] = game
      state.currentGame = game
    })
  }
})

export const { setDefaultGame, setCurrentGame } = gamesSlice.actions

export const selectDefaultGame = (state: RootState) => state.games.defaultGame
export const selectCurrentGame = (state: RootState) => state.games.currentGame

export default gamesSlice.reducer
