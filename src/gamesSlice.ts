import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

import API from './API'

interface Game {
  id: string
  clues: string[]
}

interface GamesState {
  latestGame: Game | void
  currentGame: Game | void
  games: Record<string, Game>
}

const initialState: GamesState = {
  latestGame: undefined,
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
      state.games = {...state.games, ...{[id]: game}}
      state.latestGame = state.games[id]
      if (!state.currentGame) state.currentGame = state.latestGame
    })
  }
})

export const selectLatestGame = (state: RootState) => state.games.latestGame
export const selectCurrentGame = (state: RootState) => state.games.currentGame

export default gamesSlice.reducer
