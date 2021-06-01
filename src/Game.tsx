import React from 'react'
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'

import SearchHeader from './SearchHeader'
import SearchResults from './SearchResults'

export default function Game () {
  const {path, url} = useRouteMatch()
  return (
    <div>
      <SearchHeader />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/search`} />
        </Route>
        <Route path={`${path}/search`}>
          <SearchResults />
        </Route>
      </Switch>
    </div>
  )
}
