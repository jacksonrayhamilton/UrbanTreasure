import React from 'react'

import { useAppSelector } from './hooks'
import { selectCurrentGame } from './gamesSlice'

export default function SearchResults() {
  const currentGame = useAppSelector(selectCurrentGame)
  return currentGame ? (
    <table>
      <thead>
        <tr>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {currentGame.addresses.map((address) =>
          <tr key={address}>
            <td>{address}</td>
          </tr>
        )}
      </tbody>
    </table>
  ) : null
}
