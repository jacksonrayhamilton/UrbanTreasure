import React from 'react'

import { useAppDispatch } from './hooks'
import { startNewGame } from './gamesSlice'

export default function NewGame () {
  const dispatch = useAppDispatch()
  function handleClick () {
    dispatch(startNewGame())
  }
  return (
    <button type="button" onClick={handleClick}>New Game</button>
  )
}
