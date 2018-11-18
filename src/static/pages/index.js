import React, { Component } from 'react'
import Link from 'next/link'
import Main from '../components/pageLayout'
import heroBG from '../_res/images/hero-background.jpg'
import recipeIcon from '../_res/images/recipe.svg'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

import { connect } from 'react-redux'
import actions from '../store/actions'
import presenters from '../store/presenters'
import coordinators from '../store/coordinators'
import api from '../store/api'

const Hero = styled.div`
  background: url(${ heroBG }) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 30vh;
  min-height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 0;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  }
`

const HeroTitle = styled.h1`
  color: #f5f5f5;
  position: relative;
  z-index: 1;
  text-transform: uppercase;
  font-size: 90px;
  margin-bottom: -10px;
  font-family: 'Anton', sans-serif;
  text-shadow: -3px 0px 11px rgba(0,0,0,0.7);
`

const CreateButton = styled.button`
  appearance: none;
`

const CreateButtonImg = styled.img`
  width: 20px;
`

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


class Index extends Component {
  static async getInitialProps() {
    const res = await fetch('http://127.0.0.1:3001/recipes')
    const data = await res.json()
    const recipes = presenters.responseGeneric( data )
    return { recipes }
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
      <Main>
        <Hero>
          <HeroTitle>Yum Yum Yum</HeroTitle>
        </Hero>
        <RecipesContainer>
          <RecipesContainerInner>
              <Link as={`/recipe/new`} href={`/recipe`}>
                <RecipeCard>
                  <RecipeTitle>Create New Recipe </RecipeTitle>
                </RecipeCard>
              </Link>
              { recipes.map( r =>
                <Link as={ `/recipes/${r.id}` } href={`/recipe?id=${ r.id }`}>
                  <RecipeCard key={ r.id } bg={ require(`../_res/serverImages/${ r.id }.jpg`)}>
                    <RecipeTitle>{ r.title }</RecipeTitle>
                  </RecipeCard>
                </Link>
              )}
            </RecipesContainerInner>
        </RecipesContainer>
      </Main>
    )
  }
}


const mapDispatchToProps = dispatch => {
  const createNewRecipe = () => coordinators.createNewRecipe( dispatch )
  const deleteRecipe = id => api.deleteRecipe( dispatch, id )
  const getRecipe = id => api.getRecipe( dispatch, id )
  const getRecipes = () => api.getRecipes( dispatch )
  const saveRecipe = recipe => api.saveRecipe( dispatch, recipe )

  return {
    deleteRecipe,
    createNewRecipe,
    getRecipe,
    getRecipes,
    saveRecipe,
  }
}


export default connect( undefined, mapDispatchToProps )( Index )
