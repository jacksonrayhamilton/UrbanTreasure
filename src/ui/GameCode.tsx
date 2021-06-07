import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

const Input = styled.input`
  font-family: 'Ubuntu Mono';
  width: 2.5rem;
  text-align: center;
`

const GID_SIZE = 4

export default function GameCode() {
  const history = useHistory()
  const { gid } = useParams<{ gid: string }>()
  const [lastGid, setLastGid] = useState(gid)
  const [lastInputValue, setLastInputValue] = useState(lastGid)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newGid = e.target.value
    setLastInputValue(newGid)
    if (newGid.length === GID_SIZE) history.push(`/game/${newGid}/search`)
  }

  // Update the input value when the URL changes.
  useEffect(() => {
    if (gid === lastGid) return
    setLastGid(gid)
    setLastInputValue(gid)
  })

  return (
    <span>
      Game Code: <Input
                   onChange={handleChange}
                   value={lastInputValue}
                   maxLength={4} />
    </span>
  )
}
