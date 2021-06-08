import React, { ReactElement, ReactNode } from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'

import { render as rtlRender } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { createStore, RootState } from './store'

function render(
  ui: ReactElement,
  {
    initialState,
    store = createStore(initialState),
    ...renderOptions
  }: { initialState?: RootState, store?: Store } = {},
) {
  function Wrapper({ children }: { children?: ReactNode }) {
    return (
      <Provider store={store}>{children}</Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
