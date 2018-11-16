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
  flex-wrap: wrap;
  justify-content: center;
  &::after {
    content: "";
    flex-basis: 650px;
  }
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

  componentDidMount() {
    console.log(this.props.recipes, 'the props in will mount')
    this.props.getRecipes()
  }

  componentWillReceiveProps( nextProps ) {
    console.log(nextProps.recipes, "WILL PROPS")
    if ( nextProps.recipes !== this.props.recipes ) {
      this.setState({ recipes: nextProps.recipes })
    }
  }

  linkToRecipe = id => {
    this.props.getRecipe( id )
  }

  createNewRecipe = () => {
    this.props.createNewRecipe()
  }

  render() {
    const { recipes } = this.props

    return (
      <RecipesContainer>
        <div onClick={ () => this.createNewRecipe() }> Create New Recipe </div>
        <RecipesContainerInner>
          { recipes.map( r =>
            <RecipeCard bg={ require(`../_res/serverImages/${ r.id }.jpg`)} onClick={ () => this.linkToRecipe( r.id ) }>
              <RecipeTitle>{ r.title }</RecipeTitle>
            </RecipeCard>
          )}
          </RecipesContainerInner>
      </RecipesContainer>
    )
  }
}


Recipes.propTypes = {
  recipes: PropTypes.array,

  createNewRecipe: PropTypes.func,
  getRecipes: PropTypes.func,
  getRecipe: PropTypes.func,
}


export default Recipes
