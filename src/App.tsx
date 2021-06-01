import React from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Game from './Game'

export default function App () {
  const latestGameId = 'AB12'  // FIXME: Make dynamic.
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/game" />
        </Route>
        <Route exact path="/game">
          <Redirect to={`/game/${latestGameId}`} />
        </Route>
        <Route path="/game/:gid">
          <Game />
        </Route>
      </Switch>
    </Router>
  )
}
