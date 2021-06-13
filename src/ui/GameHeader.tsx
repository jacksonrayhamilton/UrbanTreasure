import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Game } from './types'

import Clue from './Clue'
import GameCode from './GameCode'
import SearchInput from './SearchInput'
import NewGame from './NewGame'

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: .5rem;
`

interface GameProps {
  game: Game
}

export default function GameHeader({ game }: GameProps) {
  const { gid } = useParams<{ gid: string }>()
  const { clues } = game
  return (
    <div>
      <HeaderRow>
        <Clue clues={clues} />
        <GameCode gid={gid} />
      </HeaderRow>
      <HeaderRow>
        <SearchInput />
        <NewGame />
      </HeaderRow>
    </div>
  )
}
