import React from 'react'
import styled from 'styled-components'

import SearchIcon from './icons/SearchIcon'

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
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

export default function SearchInput() {
  return (
    <InputContainer>
      <Input type="search" />
      <IconContainer>
        <SearchIcon />
      </IconContainer>
    </InputContainer>
  )
}
