import React, { Component } from 'react'
import Link from 'next/link'
import Recipe from '../components/recipe'
import Main from '../components/pageLayout'
import Router, { withRouter } from 'next/router'


class RecipePage extends Component {

  render() {
    return (
      <Recipe recipe={ Router && Router.query }/>
    )
  }
}


export default RecipePage
