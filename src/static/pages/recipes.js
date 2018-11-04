import React, { Component } from 'react'
import Link from 'next/link'
import Recipes from '../container/Recipes'
import Main from '../components/pageLayout'

class RecipesPage extends Component {
  render() {
    return (
      <Main>
        Blog Page
        <Recipes />
      </Main>
    )
  }
}

export default RecipesPage
