// for sass https://github.com/zeit/next-plugins/tree/master/packages/next-sass
import React, { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Blog from '../container/Blog'

class Index extends Component {
  render() {
    return (
      <div>
        Index page
        <Head title="Home" />
        <Nav />
        <Blog />
      </div>
    )
  }
}

export default Index
