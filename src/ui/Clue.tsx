import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.span`
  white-space: nowrap;
`

interface ClueProps {
  clues: (string | null)[]
}

export default function Clue({ clues }: ClueProps) {
  const [prevClues, setPrevClues] = useState(clues)
  const [selectedClue, setSelectedClue] = useState(clues.length - 1)

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedClue(Number(e.target.value))
  }

  useEffect(() => {
    if (prevClues === clues) return
    setPrevClues(clues)
    setSelectedClue(clues.length - 1)
  })

  return (
    <Container>
      <select
        data-testid="select"
        onChange={handleChange}
        value={selectedClue}>
        {clues.map((_clue, index) =>
          <option key={index} value={index}>
            Clue {index + 1}
          </option>
        )}
      </select> {clues[selectedClue] ? <>“{clues[selectedClue]}”</> : <>???</>}
    </Container>
  )
}
