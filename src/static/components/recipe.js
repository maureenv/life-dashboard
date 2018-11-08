import React from 'react'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'

const href = {
  pathname: '/recipes', // the real page that is being used
  query: { name: 'zeit', time: 'test' }
}

const as = {
  pathname: '/recipes/testing', // what you want the new url name to be 
  hash: '' // hash for the title
}

const handleClick = () => Router.push(href, as)


export default withRouter(({ router: { query } }) => (
    <div>
      <div>on recipe component</div>
      <button onClick={handleClick}>Go to /about/zeit</button>
    </div>
))


//export default Recipe
