import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { updateClues } from './gamesSlice'
import { setFetchingAddress, fetchAddress } from './addressesSlice'

export default function Address() {
  const { gid, address: addressParam } =
    useParams<{ gid: string, address: string }>()
  const clues = useAppSelector(({ games }) => games.games[gid].clues)
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

  useEffect(() => {
    let clue
    if (!(clue = routedAddress?.clue)) return
    if (clues.includes(clue)) return
    dispatch(updateClues({ gid, address: addressParam }))
  })

  if (!routedAddress) return null
  const { address, clue, treasure } = routedAddress
  return (
    <>
      <h1>{address}</h1>
      {!(clue || treasure) ? <div>Nothing to see here.</div> : null}
      {clue ? <div><b>Clue:</b> “{clue}”</div> : null}
      {treasure ? <div>Congrats, you found the treasure!</div> : null}
    </>
  )
}
