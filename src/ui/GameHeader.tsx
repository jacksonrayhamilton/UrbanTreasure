import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Game } from './types'
import { useAppSelector } from './hooks'

import Clue from './Clue'
import GameCode from './GameCode'
import SearchInput from './SearchInput'
import NewGame from './NewGame'

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: .5rem;
`

export default function GameHeader() {
  const { gid } = useParams<{ gid: string }>()
  const routedGame = useAppSelector(({ games }) => games.games[gid])
  const clues = routedGame ? routedGame.clues : []
  return (
    <div>
      <HeaderRow>
        <Clue clues={clues} />
        <GameCode gid={gid} />
      </HeaderRow>
      <HeaderRow>
        <SearchInput game={routedGame} />
        <NewGame />
      </HeaderRow>
    </div>
  )
}
