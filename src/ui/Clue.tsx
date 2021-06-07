import React, { useState } from 'react'
import styled from 'styled-components'

import { useAppSelector } from './hooks'
import { selectCurrentGame } from './gamesSlice'

const Container = styled.span`
  text-transform: uppercase;
  white-space: nowrap;
`

export default function Clue() {
  const currentGame = useAppSelector(selectCurrentGame)
  const clues = currentGame ? currentGame.clues : []
  const [selectedClue, setSelectedClue] = useState(clues.length - 1)

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedClue(Number(e.target.value))
  }

  return (
    <Container>
      <select
        onChange={handleChange}
        defaultValue={selectedClue}>
        {clues.map((_clue, index) =>
          <option key={index} value={index}>
            Clue {index + 1}
          </option>
        )}
      </select> “{clues[selectedClue]}”
    </Container>
  )
}
