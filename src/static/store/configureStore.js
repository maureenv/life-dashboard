import React, { Component } from 'react'
import { createStore } from 'redux'
import rootReducer from './rootReducer'


const store = createStore( rootReducer )
const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'


function getOrCreateStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return store
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = store
  }
  return window[__NEXT_REDUX_STORE__]
}


export default ( App ) => {
  return class AppWithRedux extends Component {
    static async getInitialProps (appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps( appContext )
        console.log(appProps, 'the app props')
      }

      return {
        ...appProps,
        initialReduxState: reduxStore
      }
    }

    constructor (props) {
      super(props)
      this.reduxStore = getOrCreateStore()
    }

    render () {
      return <App {...this.props} reduxStore={ this.reduxStore } />
    }
  }
}
