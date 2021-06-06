import React from 'react'

import { useAppSelector } from './hooks'
import { selectCurrentGame } from './gamesSlice'

export default function SearchResults () {
  const currentGame = useAppSelector(selectCurrentGame)
  return currentGame ? (
    <ul>
      {currentGame.addresses.map((address) =>
        <li key={address}>{address}</li>
      )}
    </ul>
  ) : null
}
