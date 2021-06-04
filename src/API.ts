export default {
  fetchLatestGame() {
    return Promise.resolve({
      data: {
        game: {
          id: 'X25Q',
          clues: [
            'rabbit feet'
          ]
        }
      }
    })  // FIXME: Make dynamic.
  }
}
