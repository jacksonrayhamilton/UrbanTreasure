import React from 'react'
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'
import styled from 'styled-components'

import GameHeader from './GameHeader'
import SearchResults from './SearchResults'

const GameContainer = styled.div`
  padding: 1rem;
`

export default function Game () {
  const {path, url} = useRouteMatch()
  return (
    <GameContainer>
      <GameHeader />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/search`} />
        </Route>
        <Route path={`${path}/search`}>
          <SearchResults />
        </Route>
      </Switch>
    </GameContainer>
  )
}
