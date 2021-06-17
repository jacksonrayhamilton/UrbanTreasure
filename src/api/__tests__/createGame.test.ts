import createGame from '../createGame'

it('creates a game', () => {
  const game = createGame()
  expect(game).toBeDefined()
  expect(game.id).toHaveLength(4)
  expect(game.addresses).toHaveLength(25)
  expect(game.clues).toHaveLength(5)
})
