async function fetchLatestGame() {
  return (await fetch('/api/games/latest')).json()
}

export async function fetchGame(id: string | void, clueAddresses: string[] = []) {
  if (!id) return fetchLatestGame()
  const query = clueQuery(clueAddresses)
  return (await fetch(`/api/games/${id}${query}`)).json()
}

export async function createGame() {
  return (await fetch(`/api/games/new`, { method: 'POST' })).json()
}

export async function fetchAddress(gid: string, address: string) {
  return (await fetch(`/api/games/${gid}/address/${address}`)).json()
}

export async function fetchClues(gid: string, clueAddresses: string[]) {
  const query = clueQuery(clueAddresses)
  return (await fetch(`/api/games/${gid}/clues${query}`)).json()
}

function clueQuery(clueAddresses: string[]) {
  return clueAddresses.length
    ? '?' + clueAddresses.map((a) => `clue=${encodeURIComponent(a)}`).join('&')
    : ''
}
