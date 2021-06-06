async function fetchLatestGame () {
  return (await fetch('/api/games/latest')).json()
}

export async function fetchGame (id: string | void) {
  if (!id) return fetchLatestGame()
  return (await fetch(`/api/games/${id}`)).json()
}

export async function createGame () {
  return (await fetch(`/api/games`, { method: 'POST' })).json()
}
