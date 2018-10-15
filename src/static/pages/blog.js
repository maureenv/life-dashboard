import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
//import Blog from '../containers/Blog'


class Blog extends Component {
  state = {
    posts: []
  }

  render() {
    const {
      posts
    } = this.state
console.log(this.props.currentBlog, 'the current blog in component')
    return (
      <div>
        <h1 onClick={ () => this.props.setCurrentBlog(Math.random())}> My Blog Posts </h1>
      </div>
    )
  }
}


Blog.propTypes = {
  currentBlog: PropTypes.string,
  setCurrentBlog: PropTypes.func,
}


export default Blog
