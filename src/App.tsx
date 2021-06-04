import React, { useEffect, useState } from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { useAppSelector, useAppDispatch } from './hooks'
import { selectLatestGame, fetchLatestGame } from './gamesSlice'

import Game from './Game'

export default function App () {
  const [fetchingGame, setFetchingGame] = useState(false)
  const latestGame = useAppSelector(selectLatestGame)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (fetchingGame || latestGame) return
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
          {latestGame && <Redirect to={`/game/${latestGame.id}`} />}
        </Route>
        <Route path="/game/:gid">
          <Game />
        </Route>
      </Switch>
    </Router>
  )
}
