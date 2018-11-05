import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'


import Main from '../components/pageLayout'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: blue;
`


class Recipes extends Component {
  state = {
    title: '',
    ingredients: [],
    recipeLink: '',
    cuisineType: '',
    image: '',
    id: '',
    recipes: [],
  }

  componentDidMount() {
    this.props.getRecipes()
  }

  componentWillReceiveProps( nextProps ) {
    console.log(nextProps, 'the next props')
    if ( nextProps.recipes !== this.props.recipes ) {
      this.setState({ recipes: nextProps.recipes })
    }
  }

  createRecipe = () => {
    this.props.createRecipe( this.state )
    this.props.getRecipes()
  }

  render() {
    const {
      posts,
      directions,
      title,
      recipes,
    } = this.state

    return (
      <div>
        { recipes.map( r =>
          <div key={ r.id }>
            <p>{ r.title }</p>
            <p>{ r.cuisineType }</p>
            <img src={ require(`../_res/serverImages/${ r.id }.png`)}/>
          </div>
        )}

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
      </div>
    )
  }
}


Recipes.propTypes = {
  recipe: PropTypes.object,
  recipes: PropTypes.array,

  getRecipes: PropTypes.func,
  createRecipe: PropTypes.func,
}


export default Recipes
