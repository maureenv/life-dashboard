
import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import "../_res/main.scss"


class MyApp extends App {
  render () {
    const { Component, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component />
        </Provider>
      </Container>
    )
  }
}


export default withReduxStore( MyApp )
