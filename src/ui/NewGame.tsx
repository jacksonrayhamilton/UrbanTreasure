import React from 'react'
import { useHistory } from 'react-router-dom'

import { useAppDispatch } from './hooks'
import { createGame } from './gamesSlice'

export default function NewGame() {
  const history = useHistory()
  const dispatch = useAppDispatch()

  async function handleClick() {
    const resultAction = await dispatch(createGame())
    if (createGame.fulfilled.match(resultAction)) {
      const { game } = resultAction.payload
      history.push(`/game/${game.id}/search`)
    }
  }

  return (
    <button type="button" onClick={handleClick}>New Game</button>
  )
}
