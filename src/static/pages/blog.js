import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//import Blog from '../containers/Blog'
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: red;
`

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
        <Title onClick={ () => this.props.setCurrentBlog(Math.random())}> My Blog Posts </Title>
      </div>
    )
  }
}


Blog.propTypes = {
  currentBlog: PropTypes.string,
  setCurrentBlog: PropTypes.func,
}


export default Blog
