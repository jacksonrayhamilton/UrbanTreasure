import React from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import DefaultGame from './DefaultGame'
import Game from './Game'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/game" />
        </Route>
        <Route exact path="/game">
          <DefaultGame />
        </Route>
        <Route path="/game/:gid">
          <Game />
        </Route>
      </Switch>
    </Router>
  )
}
