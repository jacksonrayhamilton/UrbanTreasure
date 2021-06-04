import React, { useEffect, useState } from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { selectDefaultGame, fetchLatestGame } from './gamesSlice'

import Game from './Game'

export default function App () {
  const [fetchingGame, setFetchingGame] = useState(false)
  const defaultGame = useAppSelector(selectDefaultGame)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (fetchingGame || defaultGame) return
    setFetchingGame(true)
    dispatch(fetchLatestGame())
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
