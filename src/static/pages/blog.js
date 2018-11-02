import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//import Blog from '../containers/Blog'
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: blue;
`


class Blog extends Component {
  state = {
    title: '',
    ingredients: [],
    recipeLink: '',
    cuisineType: '',
    image: '',
  }

  // getBase64 = file => {
  //   console.log(file, 'the original file')
  //    var reader = new FileReader();
  //    reader.readAsDataURL(file);
  //    reader.onload = function () {
  //      console.log(reader.result);
  //    };
  //    reader.onerror = function (error) {
  //      console.log('Error: ', error);
  //    };
  // }
  sendImage = img => {
    var formData = new FormData()
    console.log(img, 'the img')
    formData.append("image", img )
    for (var i of formData.entries()) {
      console.log(i, 'the form data')
    }

    const options = {
      method: "POST",
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }
    delete options.headers['Content-Type']

    fetch('http://127.0.0.1:3001/recipes', options
      //headers: {'Content-Type': 'multipart/form-data'},
        //const headers = { 'Content-Type': 'multipart/form-data' }
    )
    .then(response => response.json())
    .then(data => console.log(data, 'the response'))
    .catch((err)=> console.log(err, 'the error'))

  }

  test = () => {
    const data = this.state
    console.log(data, 'teh data')
    const cleanData = {}
    const directions = []
    const entries = Object.entries( data )
    for ( const [key, value] of entries ) {
      //console.log(key, 'key', value, 'value')
      if ( key.includes("directions") ) {
        const number = key.split("_")[0]
        directions.push({[number]:value})
      }
    }
    cleanData['directions'] = directions
    cleanData['title'] = data.title
    cleanData['recipeLink'] = "https://www.tasteofhome.com/collection/recipes-for-ripe-bananas/view-all/"
    cleanData['ingredients'] = [{1: 'bananas'}, {2:'apples'}]
    cleanData['cuisineType'] = data.cuisineType
    cleanData['image'] = data.image
    console.log(cleanData, 'the clean data')

    fetch('http://127.0.0.1:3001/recipes', {
      method: "POST",
      body: JSON.stringify(cleanData),
      headers: {'Content-Type': 'application/json'},
        //const headers = { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => response.json())
    .then(data => console.log(data, 'the response'))
    .catch((err)=> console.log(err, 'the error'))
  }

  render() {
    const {
      posts,
      directions,
      title,
    } = this.state
    console.log(this.state, 'the state')

    return (
      <div>
        <Title onClick={ () => this.props.setCurrentBlog(Math.random())}> My Blog Posts </Title>
        <div onClick={ () => this.test() }> Click To Test </div>
        <label>Recipe Title</label><input type="text" onChange={ e => this.setState({ title: e.target.value })}/>
        <br/>
        <label>Recipe Link</label><input type="text" onChange={ e => this.setState({ recipeLink: e.target.value })}/>
        <br/>
        <label>Cuisine type</label><input type="text" onChange={ e => this.setState({ cuisineType: e.target.value })}/>
        <br/>
        <label>Directions</label><input type="text" onBlur={ e => this.setState({ [`${1}_directions`]: e.target.value }) }/>
        <label>Directions</label><input type="text" onBlur={ e => this.setState({ [`${2}_directions`]: e.target.value }) }/>
        <label>Image</label><input type="file" onChange={ e => this.sendImage(e.target.files[0])} />
      </div>
    )
  }
}


Blog.propTypes = {
  currentBlog: PropTypes.string,
  setCurrentBlog: PropTypes.func,
}


export default Blog
