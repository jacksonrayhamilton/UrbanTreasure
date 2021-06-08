import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

import { Game } from './types'
import * as API from './API'

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

export const createGame =
  createAsyncThunk('games/createGame', async () => {
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
    builder.addCase(createGame.fulfilled, (state, action) => {
      const { game } = action.payload
      const { id } = game
      state.games[id] = game
    })
  }
})

export const { setDefaultGame, setCurrentGame } = gamesSlice.actions

export const selectDefaultGame = (state: RootState) => state.games.defaultGame
export const selectCurrentGame = (state: RootState) => state.games.currentGame

export default gamesSlice.reducer
