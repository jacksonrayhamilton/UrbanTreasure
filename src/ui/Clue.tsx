import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.span`
  white-space: nowrap;
`

interface ClueProps {
  clues: string[]
}

export default function Clue({ clues }: ClueProps) {
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
