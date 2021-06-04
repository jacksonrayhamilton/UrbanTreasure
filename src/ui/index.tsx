import 'normalize.css'

import React from 'react'
import ReactDOM from 'react-dom'

import GlobalStyle from './GlobalStyle'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.querySelector('#root')
)
