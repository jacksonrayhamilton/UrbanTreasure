const games = {
  'AB12': {
    id: 'AB12',
    clues: [
      'smelly fig',
      'hop kitty'
    ]
  },
  'X25Q': {
    id: 'X25Q',
    clues: [
      'rabbit feet',
      'pickle salad'
    ]
  }
}  // FIXME: Make dynamic.

export default {
  fetchLatestGame() {
    return Promise.resolve({ data: { game: games['X25Q'] } })
  },
  fetchGame(id: string | void) {
    if (!id) return this.fetchLatestGame()
    return Promise.resolve({ data: { game: games['AB12'] } })
  }
}
