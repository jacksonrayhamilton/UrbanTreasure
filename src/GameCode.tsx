import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

const Input = styled.input`
  font-family: 'Ubuntu Mono';
  width: 2.5rem;
  text-align: center;
`

const GID_SIZE = 4

export default function GameCode () {
  const history = useHistory()
  const { gid } = useParams<{ gid: string }>()

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const newGid = e.target.value
    if (newGid.length === GID_SIZE) history.push(`/game/${newGid}/search`)
  }

  return (
    <span>
      Game Code: <Input
                   onChange={handleChange}
                   defaultValue={gid}
                   maxLength={4} />
    </span>
  )
}
