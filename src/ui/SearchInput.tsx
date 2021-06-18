import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Game } from './types'
import SearchIcon from './icons/SearchIcon'

interface InputContainerProps {
  isHidden: boolean
}

const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  display: inline-block;
  ${({ isHidden }) => isHidden && 'visibility: hidden;'}
`

const Input = styled.input`
  padding-right: 1.5rem;
`

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 1.5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  svg { width: 1rem; height: 1rem; }
`

interface SearchInputProps {
  game?: Game
}

export default function SearchInput({ game }: SearchInputProps) {
  const history = useHistory()
  const { gid } = useParams<{ gid: string }>()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value
    const params = new URLSearchParams
    if (term) params.set('term', term)
    const query = params.toString() ? `?${params}` : ''
    history.push(`/game/${gid}/search${query}`)
  }

  return (
    <InputContainer isHidden={!game}>
      <Input type="search" onChange={handleChange} />
      <IconContainer>
        <SearchIcon />
      </IconContainer>
    </InputContainer>
  )
}
