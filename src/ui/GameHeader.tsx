import React from 'react'
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
  const { clues } = game
  return (
    <div>
      <HeaderRow>
        <Clue clues={clues} />
        <GameCode />
      </HeaderRow>
      <HeaderRow>
        <SearchInput />
        <NewGame />
      </HeaderRow>
    </div>
  )
}
