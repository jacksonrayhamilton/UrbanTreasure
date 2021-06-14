import React, { useEffect, useState } from 'react'
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom'
import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from './hooks'
import { selectCurrentGame, fetchGame, setCurrentGame } from './gamesSlice'

import GameHeader from './GameHeader'
import SearchResults from './SearchResults'

const GameContainer = styled.div`
  padding: 1rem;
`

export default function Game() {
  const [fetchingGames, setFetchingGames] = useState({})
  const { gid } = useParams<{ gid: string }>()
  const { path, url } = useRouteMatch()
  const currentGame = useAppSelector(selectCurrentGame)
  const routedGame = useAppSelector(({ games }) => games.games[gid])
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function effect() {
      setFetchingGames({ ...fetchingGames, [gid]: true })
      dispatch(fetchGame(gid))
    }
    if (Object.prototype.hasOwnProperty.call(fetchingGames, gid) ||
        routedGame) return
    effect()
  })

  useEffect(() => {
    if (!routedGame) return
    if (currentGame === routedGame) return
    dispatch(setCurrentGame(routedGame))
  })

  return currentGame ? (
    <GameContainer>
      <GameHeader game={currentGame} />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/search`} />
        </Route>
        <Route path={`${path}/search`}>
          <SearchResults game={currentGame} />
        </Route>
      </Switch>
    </GameContainer>
  ) : null
}
