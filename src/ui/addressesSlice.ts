import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Address } from './types'
import * as API from './API'

interface AddressesState {
  addresses: Record<string, Address>
  isFetchingAddress: Record<string, boolean>
}

const initialState = createInitialAddressesState()

export function createInitialAddressesState(): AddressesState {
  return {
    addresses: {},
    isFetchingAddress: {}
  }
}

interface FetchAddressAction {
  gid: string
  address: string
}

export const fetchAddress =
  createAsyncThunk(
    'games/fetchAddress',
    async ({ gid, address }: FetchAddressAction, { dispatch }) => {
      dispatch(setFetchingAddress({ gid, address }))
      const response = await API.fetchAddress(gid, address)
      return response.data
    }
  )

export const addressesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setFetchingAddress(state, action) {
      const { gid, address } = action.payload
      state.isFetchingAddress[`${gid}/${address}`] = true
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      const { address } = action.payload
      const { gid } = address
      state.addresses[`${gid}/${address.address}`] = address
    })
  }
})

const { setFetchingAddress } = addressesSlice.actions

export default addressesSlice.reducer
