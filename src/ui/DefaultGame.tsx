import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { selectDefaultGame, fetchGame, setDefaultGame } from './gamesSlice'

export default function DefaultGame() {
  const [fetchingGame, setFetchingGame] = useState(false)
  const defaultGame = useAppSelector(selectDefaultGame)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function effect() {
      setFetchingGame(true)
      const resultAction = await dispatch(fetchGame())
      if (fetchGame.fulfilled.match(resultAction)) {
        const { game } = resultAction.payload
        dispatch(setDefaultGame(game))
      }
    }
    if (fetchingGame || defaultGame) return
    effect()
  })

  return defaultGame ? <Redirect to={`/game/${defaultGame.id}`} /> : null
}
