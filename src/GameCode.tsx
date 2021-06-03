import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  font-family: 'Ubuntu Mono';
  width: 2.5rem;
  text-align: center;
`

export default function GameCode () {
  const gameCode = 'X25Q' // FIXME: Make dynamic.

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    // TODO: Change page URL.
  }

  return (
    <span>
      Game Code: <Input
                   onChange={handleChange}
                   defaultValue={gameCode}
                   maxLength={4} />
    </span>
  )
}
