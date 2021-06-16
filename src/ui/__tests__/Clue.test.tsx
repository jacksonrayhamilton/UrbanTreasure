import React from 'react'
import { cleanup, render, fireEvent } from '../test-util'

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

it('renders missing clues', () => {
  const clues = [
    'Clue #1',
    null,
    'Clue #3'
  ]
  const { getByTestId, getByText, rerender } = render(<Clue clues={clues} />)
  const select = getByTestId('select')
  fireEvent.change(select, { target: { value: '1' } })
  rerender(<Clue clues={clues} />)
  expect(getByText(/\?\?\?/)).toBeInTheDocument()
})
