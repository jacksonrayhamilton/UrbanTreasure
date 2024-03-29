import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { updateClues } from './gamesSlice'
import { fetchAddress } from './addressesSlice'

export default function Address() {
  const history = useHistory()
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
    dispatch(fetchAddress({ gid, address: addressParam }))
  })

  useEffect(() => {
    let clue
    if (!(clue = routedAddress?.clue)) return
    if (clues[clue.index]) return
    dispatch(updateClues({ gid, clue, address: addressParam }))
  })

  function goBack() {
    history.goBack()
  }

  if (!routedAddress) return null
  const { address, clue: clueObject, treasure } = routedAddress
  const clue = clueObject?.clue
  return (
    <>
      <h1>{address}</h1>
      {!(clue || treasure) ? <p>Nothing to see here.</p> : null}
      {clue ? <p><b>Clue:</b> “{clue}”</p> : null}
      {treasure
      ? <p>Congrats, you found the treasure!</p>
      : <button onClick={goBack}>Go back</button>}
    </>
  )
}
