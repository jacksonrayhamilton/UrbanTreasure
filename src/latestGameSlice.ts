import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

import API from './API'

interface LatestGameState {
  id: string | void
}

const initialState: LatestGameState = {
  id: undefined
}

export const fetchLatestGame =
  createAsyncThunk('latestGame/fetchLatestGame', async () => {
    const response = await API.fetchLatestGame()
    return response.data
  })

export const latestGameSlice = createSlice({
  name: 'latestGame',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLatestGame.fulfilled, (state, action: PayloadAction<string>) => {
      state.id = action.payload
    })
  }
})

export const selectLatestGame = (state: RootState) => state.latestGame.id

export default latestGameSlice.reducer
