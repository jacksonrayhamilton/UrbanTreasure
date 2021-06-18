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
  const gameQuery = `${gid}${search}`
  const { path, url } = useRouteMatch()
  const routedGame = useAppSelector(({ games }) => games.games[gameQuery])
  const isFetchingRoutedGame =
    useAppSelector(({ games }) => games.isFetchingGame[gameQuery])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (routedGame || isFetchingRoutedGame) return
    dispatch(fetchGame(gameQuery))
  })

  return (
    <GameContainer>
      <GameHeader />
      {routedGame ? (
        <Switch>
          <Route exact path={path}>
            <Redirect to={`${url}/search`} />
          </Route>
          <Route path={`${path}/search`}>
            <SearchResults {...routedGame.addresses} />
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
