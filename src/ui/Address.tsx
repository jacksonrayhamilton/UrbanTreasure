import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { setFetchingAddress, fetchAddress } from './addressesSlice'

export default function Address() {
  const { gid, address: addressParam } =
    useParams<{ gid: string, address: string }>()
  const routedAddress =
    useAppSelector(({ addresses }) =>
      addresses.addresses[`${gid}/${addressParam}`])
  const isFetchingRoutedAddress =
    useAppSelector(({ addresses }) =>
      addresses.isFetchingAddress[`${gid}/${addressParam}`])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (routedAddress || isFetchingRoutedAddress) return
    dispatch(setFetchingAddress({ gid, address: addressParam }))
    dispatch(fetchAddress({ gid, address: addressParam }))
  })

  if (!routedAddress) return null
  const { address, clue, treasure } = routedAddress
  return (
    <>
      <h1>{address}</h1>
      {clue ? <div><b>Clue:</b> “{clue}”</div> : null}
      {treasure ? <div>Congrats, you found the treasure!</div> : null}
    </>
  )
}
