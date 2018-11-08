import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Recipe from './recipe'
import Link from 'next/link'


import Main from '../components/pageLayout'

const RecipesContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RecipesContainerInner = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
`

const RecipeCard = styled.div`
  width: 300px;
  height: 250px;
  position: relative;
  cursor: pointer;
  background: url(${ props => props.bg }) no-repeat center center;
  background-size: cover;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  margin: 10px;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  }
`

const RecipeTitle = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  position: relative;
  padding: 10px 20px;
  margin-bottom: 10px;
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid #fff;
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
    console.log(recipes, 'the recipes')

    return (
      <RecipesContainer>
        <RecipesContainerInner>
          { recipes.map( r =>
            <Link href={{ pathname: '/recipes', query: r }} as={{ pathname: '/recipes/${r.title}'}}>
            <RecipeCard bg={ require(`../_res/serverImages/${ r.id }.jpg`)}>
              <RecipeTitle>{ r.title }</RecipeTitle>
            </RecipeCard>
            </Link>
          )}
          {/*<div onClick={ () => this.createRecipe() }> Click To Test </div>
          <label>Recipe Title</label><input type="text" onChange={ e => this.setState({ title: e.target.value })}/>
          <br/>
          <label>Recipe Link</label><input type="text" onChange={ e => this.setState({ recipeLink: e.target.value })}/>
          <br/>
          <label>Cuisine type</label><input type="text" onChange={ e => this.setState({ cuisineType: e.target.value })}/>
          <br/>
          <label>Directions</label><input type="text" onBlur={ e => this.setState({ [`${1}_directions`]: e.target.value }) }/>
          <label>Directions</label><input type="text" onBlur={ e => this.setState({ [`${2}_directions`]: e.target.value }) }/>
          <label>Image</label><input type="file" onChange={ e => this.setState({ image: e.target.files[0] }) } />*/}
          </RecipesContainerInner>
      </RecipesContainer>
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
