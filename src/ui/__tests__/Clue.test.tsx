import React from 'react'
import { cleanup, render } from '../test-util'

import Clue from '../Clue'

afterEach(cleanup)

it('renders the last clue by default', () => {
  const clues = [
    'Clue #1',
    'Clue #2'
  ]
  const { getByText } = render(<Clue clues={clues} />)
  expect(getByText(/Clue #2/)).toBeInTheDocument()
})
