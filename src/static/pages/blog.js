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
    testing: 'hi'
  }

  test = () => {
    const data = {
      title: 'cats',
      content: 'cats are cool'
    }
    fetch('http://127.0.0.1:3001/test', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
      //mode: 'no-cors',
      // https://github.com/Rob--W/cors-anywhere
    })
    .then(response => response.json())
    .then(data => this.setState({ testing: data }, () => console.log( data, 'the data in response' )))
    .catch((err)=> console.log(err, 'the error'))
  }

  render() {
    const {
      posts
    } = this.state

    return (
      <div>
        <Title onClick={ () => this.props.setCurrentBlog(Math.random())}> My Blog Posts </Title>
        <div onClick={ () => this.test() }> Click To Test </div>
      </div>
    )
  }
}


Blog.propTypes = {
  currentBlog: PropTypes.string,
  setCurrentBlog: PropTypes.func,
}


export default Blog
