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
  const [fetchingLatestGame, setFetchingLatestGame] = useState(false)
  const latestGame = useAppSelector(selectLatestGame)
  const latestGameId = latestGame ? latestGame.id : undefined
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (fetchingLatestGame || latestGameId) return
    setFetchingLatestGame(true)
    dispatch(fetchLatestGame())
  })

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/game" />
        </Route>
        <Route exact path="/game">
          {latestGameId && <Redirect to={`/game/${latestGameId}`} />}
        </Route>
        <Route path="/game/:gid">
          <Game />
        </Route>
      </Switch>
    </Router>
  )
}
