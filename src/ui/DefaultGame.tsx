import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { selectDefaultGame, fetchDefaultGame } from './gamesSlice'

export default function DefaultGame() {
  const defaultGame = useAppSelector(selectDefaultGame)
  const isFetchingDefaultGame =
    useAppSelector(({ games }) => games.isFetching['default'])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (defaultGame || isFetchingDefaultGame) return
    dispatch(fetchDefaultGame())
  })

  return defaultGame ? <Redirect to={`/game/${defaultGame.id}`} /> : null
}
