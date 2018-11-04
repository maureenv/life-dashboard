import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import window from 'global'

//import Blog from '../container/Blog'
import Main from '../components/pageLayout'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: blue;
`

const urlCreator = window.URL || window.webkitURL;

class Recipes extends Component {
  state = {
    title: '',
    ingredients: [],
    recipeLink: '',
    cuisineType: '',
    image: '',
    blobImage: '',
    id: '',
    recipes: [],
  }

  componentDidMount() {
    this.getRecipes()
  }

  getRecipes = () => {
    fetch('http://127.0.0.1:3001/recipes')
    .then(response => response.json())
    .then(data => this.setState({ recipes: data }))
    .catch((err)=> console.log(err, 'the error'))
  }

  sendImage = id => {
    const { image } = this.state
    console.log(id, 'the id')
    var formData = new FormData()
    formData.append("file", image )
    formData.append("id", id )

    const options = {
      method: "POST",
      body: formData,
    }

    fetch('http://127.0.0.1:3001/upload', options )
    .then(response => response.blob())
    .then(data => this.setState({ blobImage: urlCreator.createObjectURL( data ) }))
    .catch((err)=> console.log(err, 'the error'))

  }

  createRecipe = () => {
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
    console.log(cleanData, 'the clean data')

    fetch('http://127.0.0.1:3001/recipes/new', {
      method: "POST",
      body: JSON.stringify(cleanData),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => this.setState({
      id: data._id,
      cuisineType: data.cuisine_type,
      directions: data.directions,
      ingredients: data.ingredients,
      recipeLink: data.recipe_link,
      title: data.title
    }, () => this.sendImage( this.state.id )))
    .catch((err)=> console.log(err, 'the error'))
  }

  render() {
    const {
      posts,
      directions,
      title,
      blobImage,
      recipes,
    } = this.state
    console.log(this.state, 'the state')

    return (
      <div>
        { recipes.map( r =>
          <div>
            <p>{ r.title }</p>
            <p>{ r.cuisine_type }</p>
            <img src={ require(`../_res/serverImages/${ r._id }.png`)}/>
          </div>
        )}
        <Title onClick={ () => this.props.setCurrentBlog(Math.random())}> My Blog Posts </Title>
        <div onClick={ () => this.createRecipe() }> Click To Test </div>
        <label>Recipe Title</label><input type="text" onChange={ e => this.setState({ title: e.target.value })}/>
        <br/>
        <label>Recipe Link</label><input type="text" onChange={ e => this.setState({ recipeLink: e.target.value })}/>
        <br/>
        <label>Cuisine type</label><input type="text" onChange={ e => this.setState({ cuisineType: e.target.value })}/>
        <br/>
        <label>Directions</label><input type="text" onBlur={ e => this.setState({ [`${1}_directions`]: e.target.value }) }/>
        <label>Directions</label><input type="text" onBlur={ e => this.setState({ [`${2}_directions`]: e.target.value }) }/>
        <label>Image</label><input type="file" onChange={ e => this.setState({ image: e.target.files[0] }) } />
        <img src={ blobImage } alt="image test" />
      </div>
    )
  }
}


Recipes.propTypes = {
  currentBlog: PropTypes.string,
  setCurrentBlog: PropTypes.func,
}


export default Recipes
