import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface ContainerProps {
  isHidden: boolean
}

const Container = styled.span<ContainerProps>`
  white-space: nowrap;
  ${({ isHidden }) => isHidden && 'visibility: hidden;'}
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
    <Container isHidden={!clues.length}>
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
