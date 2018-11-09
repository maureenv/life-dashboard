import React, { Component } from 'react'
import Link from 'next/link'
import Recipe from '../container/Recipe'
import Main from '../components/pageLayout'
import Router, { withRouter } from 'next/router'


class RecipePage extends Component {

  render() {
    return (
      <Recipe/>
    )
  }
}


export default RecipePage
