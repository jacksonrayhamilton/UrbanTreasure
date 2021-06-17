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

it('advances to the latest clue', () => {
  const clues1 = [
    'Clue #1',
    'Clue #2'
  ]
  const clues2 = [
    ...clues1,
    'Clue #3'
  ]
  const { getByTestId, getByText, rerender } = render(<Clue clues={clues1} />)
  const select = getByTestId('select')
  expect(getByText(/Clue #2/)).toBeInTheDocument()
  expect(select).toHaveValue('1')
  rerender(<Clue clues={clues2} />)
  expect(getByText(/Clue #3/)).toBeInTheDocument()
  expect(select).toHaveValue('2')
})
