import React from 'react'
import styled from 'styled-components'

import SearchIcon from './icons/SearchIcon'

const SearchInputContainer = styled.div`
  position: relative;
  display: inline-block;

  input {
    padding-right: 20px;
  }

  svg {
    position: absolute;
    top: 3px;
    right: 3px;
    height: calc(100% - 6px);
  }
`

export default function SearchInput () {
  return (
    <SearchInputContainer>
      <input type="search" />
      <SearchIcon />
    </SearchInputContainer>
  )
}
