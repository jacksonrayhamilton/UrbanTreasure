import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Game } from './types'

interface SearchResultsProps {
  game: Game
}

export default function SearchResults({ game }: SearchResultsProps) {
  const { gid } = useParams<{ gid: string }>()
  const { addresses } = game
  return (
    <table>
      <thead>
        <tr>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {addresses.map((address) =>
          <tr key={address}>
            <td><Link to={`/game/${gid}/address/${encodeURIComponent(address)}`}>{address}</Link></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
