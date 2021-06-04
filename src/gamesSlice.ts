import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

import API from './API'

interface Game {
  id: string
  clues: string[]
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

export const fetchLatestGame =
  createAsyncThunk('games/fetchLatestGame', async () => {
    const response = await API.fetchLatestGame()
    return response.data
  })

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLatestGame.fulfilled, (state, action) => {
      const { game } = action.payload
      const { id } = game
      state.games[id] = game
      state.defaultGame = state.games[id]
      if (!state.currentGame) state.currentGame = state.defaultGame
    })
  }
})

export const selectDefaultGame = (state: RootState) => state.games.defaultGame
export const selectCurrentGame = (state: RootState) => state.games.currentGame

export default gamesSlice.reducer
