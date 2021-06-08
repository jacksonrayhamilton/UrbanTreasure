import React from 'react'
import { cleanup, render } from '../test-util'

import { RootState } from '../store'
import Clue from '../Clue'

afterEach(cleanup)

it('renders the last clue by default', () => {
  const initialState: RootState = {
    games: {
      defaultGame: undefined,
      currentGame: {
        id: '',
        clues: [
          'Clue #1',
          'Clue #2'
        ],
        addresses: []
      },
      games: {}
    }
  }
  const { getByText } = render(<Clue />, { initialState })
  expect(getByText(/Clue #2/)).toBeInTheDocument()
})
