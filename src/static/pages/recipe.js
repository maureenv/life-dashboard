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

//
// import React from 'react'
//
// export default class extends React.Component {
//   static async getInitialProps({ req }) {
//     const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
//     return { userAgent }
//   }
//
//   render() {
//     return (
//       <div>
//         Hello World {this.props.userAgent}
//       </div>
//     )
//   }
// }


// https://nextjs.org/learn/basics/fetching-data-for-pages/setup
