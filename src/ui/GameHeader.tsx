import React from 'react'
import styled from 'styled-components'

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
  return (
    <div>
      <HeaderRow>
        <Clue />
        <GameCode />
      </HeaderRow>
      <HeaderRow>
        <SearchInput />
        <NewGame />
      </HeaderRow>
    </div>
  )
}
