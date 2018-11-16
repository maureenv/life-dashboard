import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../store/configureStore'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css?family=Anton|Roboto:300,400,500,700');
  body {
    background: #f5f5f5;
  }
`


class MyApp extends App {
  render () {
    const { Component, reduxStore, pageProps } = this.props
    return (
      <Container>
        <GlobalStyle/>
        <Provider store={ reduxStore }>
          <Component { ...pageProps } />
        </Provider>
      </Container>
    )
  }
}


export default withReduxStore( MyApp )
