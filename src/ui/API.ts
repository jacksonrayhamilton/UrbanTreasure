import { parseGameQuery } from './util'

export async function fetchLatestGame() {
  return (await fetch('/api/games/latest')).json()
}

export async function fetchGame(query: string, clueAddresses: string[] = []) {
  query = clueQuery(query, clueAddresses)
  return (await fetch(`/api/games/${query}`)).json()
}

export async function createGame() {
  return (await fetch(`/api/games/new`, { method: 'POST' })).json()
}

export async function fetchAddress(gid: string, address: string) {
  return (await fetch(`/api/games/${gid}/address/${address}`)).json()
}

function clueQuery(query: string, clueAddresses: string[]) {
  const { id, search } = parseGameQuery(query)
  const params = new URLSearchParams(search)
  clueAddresses.forEach((address) => {
    params.append('clue', address)
  })
  return id + (params.toString().length ? `?${params}` : '')
}
