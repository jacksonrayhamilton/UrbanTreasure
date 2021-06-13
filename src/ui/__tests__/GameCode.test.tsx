import React from 'react'
import { cleanup, render } from '../test-util'
import { fireEvent } from '@testing-library/react'

import GameCode from '../GameCode'

afterEach(cleanup)

it('defaults and adjusts to gid prop', () => {
  const { getByLabelText, rerender } = render(<GameCode gid={'AB12'} />)
  const input = getByLabelText(/Game Code:/) as HTMLInputElement
  expect(input).toHaveValue('AB12')
  fireEvent.change(input, { target: { value: 'AB1' } })
  rerender(<GameCode gid={'AB12'} />)
  expect(input).toHaveValue('AB1')
  rerender(<GameCode gid={'CD34'} />)
  expect(input).toHaveValue('CD34')
})
