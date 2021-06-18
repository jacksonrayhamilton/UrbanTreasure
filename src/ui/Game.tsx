import React, { useEffect, useState } from 'react'
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch
} from 'react-router-dom'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from './hooks'
import { fetchGame } from './gamesSlice'

import GameHeader from './GameHeader'
import SearchResults from './SearchResults'
import Address from './Address'

const GameContainer = styled.div`
  padding: 1rem;
`

export default function Game() {
  const { gid } = useParams<{ gid: string }>()
  const { search } = useLocation()
  const query = `${gid}${search}`
  const { path, url } = useRouteMatch()
  const response = useAppSelector(({ games }) => games.responses[query])
  const isFetching = useAppSelector(({ games }) => games.isFetching[query])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (response || isFetching) return
    dispatch(fetchGame(query))
  })

  return (
    <GameContainer>
      <GameHeader />
      {response ? (
        <Switch>
          <Route exact path={path}>
            <Redirect to={`${url}/search`} />
          </Route>
          <Route path={`${path}/search`}>
            <SearchResults {...response.addresses} />
          </Route>
          <Route exact path={`${path}/address`}>
            <Redirect to={`${url}`} />
          </Route>
          <Route path={`${path}/address/:address`}>
            <Address />
          </Route>
        </Switch>
      ) : null}
    </GameContainer>
  )
}
