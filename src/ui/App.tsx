import React, { useEffect, useState } from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { selectDefaultGame, fetchGame, setDefaultGame } from './gamesSlice'

import Game from './Game'

export default function App () {
  const [fetchingGame, setFetchingGame] = useState(false)
  const defaultGame = useAppSelector(selectDefaultGame)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function effect () {
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

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/game" />
        </Route>
        <Route exact path="/game">
          {defaultGame && <Redirect to={`/game/${defaultGame.id}`} />}
        </Route>
        <Route path="/game/:gid">
          <Game />
        </Route>
      </Switch>
    </Router>
  )
}
