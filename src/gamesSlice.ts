import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

import API from './API'

interface GamesState {
  latestGame: string | void
}

const initialState: GamesState = {
  latestGame: undefined
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
    builder.addCase(fetchLatestGame.fulfilled, (state, action: PayloadAction<string>) => {
      state.latestGame = action.payload
    })
  }
})

export const selectLatestGame = (state: RootState) => state.games.latestGame

export default gamesSlice.reducer
