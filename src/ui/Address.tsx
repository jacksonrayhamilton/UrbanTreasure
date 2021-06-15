import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { setFetchingAddress, fetchAddress } from './addressesSlice'

export default function Address() {
  const { gid, address } = useParams<{ gid: string, address: string }>()
  const routedAddress =
    useAppSelector(({ addresses }) =>
      addresses.addresses[`${gid}/${address}`])
  const isFetchingRoutedAddress =
    useAppSelector(({ addresses }) =>
      addresses.isFetchingAddress[`${gid}/${address}`])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (routedAddress || isFetchingRoutedAddress) return
    dispatch(setFetchingAddress({ gid, address }))
    dispatch(fetchAddress({ gid, address }))
  })

  return routedAddress ? (
    <>
      <h1>{routedAddress.address}</h1>
      {routedAddress.clue ? <div><b>Clue:</b> “{routedAddress.clue}”</div> : null}
    </>
  ) : null
}
