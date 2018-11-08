import React, { Component } from 'react'
import Link from 'next/link'
import Recipes from '../container/Recipes'
import Main from '../components/pageLayout'
import Router, { withRouter } from 'next/router'

class RecipesPage extends Component {

  render() {
    console.log(Router.query, 'the router')
    return (
      <Main>
        Recipes Page
      </Main>
    )
  }
}

export default RecipesPage
