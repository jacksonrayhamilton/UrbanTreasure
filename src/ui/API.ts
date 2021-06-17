async function fetchLatestGame() {
  return (await fetch('/api/games/latest')).json()
}

export async function fetchGame(id: string | void) {
  if (!id) return fetchLatestGame()
  return (await fetch(`/api/games/${id}`)).json()
}

export async function createGame() {
  return (await fetch(`/api/games/new`, { method: 'POST' })).json()
}

export async function fetchAddress(gid: string, address: string) {
  return (await fetch(`/api/games/${gid}/address/${address}`)).json()
}

export async function fetchClues(gid: string, clueAddresses: string[]) {
  const query =
    clueAddresses.length
    ? '?' + clueAddresses.map((a) => `clue=${encodeURIComponent(a)}`).join('&')
    : ''
  return (await fetch(`/api/games/${gid}/clues${query}`)).json()
}
