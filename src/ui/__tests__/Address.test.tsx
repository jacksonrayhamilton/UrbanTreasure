import React from 'react'
import { MemoryRouter, Route } from 'react-router'
import { cleanup, render } from '../test-util'

import { createRootState } from '../store'
import Address from '../Address'

afterEach(cleanup)

it('renders the routed address', () => {
  const initialState = createRootState()
  Object.assign(initialState.games.games, {
    'ABCD': {
      id: '',
      clues: [''],
      addresses: ['']
    }
  })
  Object.assign(initialState.addresses.addresses, {
    'ABCD/1111 Bluish Way': {
      address: '1111 Bluish Way'
    }
  })
  const { getByText } = render((
    <MemoryRouter initialEntries={['/games/ABCD/address/1111 Bluish Way']}>
      <Route path="/games/:gid/address/:address">
        <Address />
      </Route>
    </MemoryRouter>
  ), { initialState })
  expect(getByText(/1111 Bluish Way/)).toBeInTheDocument()
})
