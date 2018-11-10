import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import ContentEditable from './contentEditable'


const Hero = styled.div`
  background: url(${ props => props.bg }) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 30vh;
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
  font-size: 100px;
  margin-bottom: -10px;
  font-family: 'Anton', sans-serif;
  text-shadow: -3px 0px 11px rgba(0,0,0,0.7);
`

const RecipeContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RecipeContainerInner = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const SubTitle = styled.h2`
  font-family: 'Anton', sans-serif;
  font-size: 40px;
  color: #666;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 20px;
`

const Ingredient = styled.textarea`
  color: #666;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  margin-bottom: 10px;
  display: block;
  background: none;
  border: none;
  padding: 3px 0;
  width: 100%;
`

const Direction = styled.textarea`
  color: #666;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  margin-bottom: 10px;
  display: block;
  background: none;
  border: none;
  padding: 3px 0;
  width: 100%;
  overflow-wrap: break-word;
`

const Divider = styled.div`
  width: 100%;
  height: 50px;
`

const StepContainer = styled.div`
  display: flex;
`

const Step = styled.div`
  padding: 10px;
  box-sizing: border-box;
  border-radius: 20px;
  background: red;
  color: #fff;
  font-family: 'Anton', sans-serif;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 12px;
  margin-right: 10px;
`


class Recipe extends Component {

  state = {}

  componentWillMount() {
    this.buildState( this.props.recipe )
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.recipe !== this.props.recipe ) {
      this.buildState( nextProps.recipe )
    }
  }

  buildState( recipe ) {
    const newState = {}
    newState['title'] = recipe.title
    newState['cuisineType'] = recipe.cuisineType
    newState['id'] = recipe.id
    newState['recipeLink'] = recipe.recipeLink

    recipe.directions.map( d => {
      newState[`${ Object.keys( d ) }_directions`] = Object.values( d )[0]
    })

    recipe.ingredients.map( i => {
      newState[`${ Object.keys( i ) }_ingredients`] = Object.values( i )[0]
    })
    this.setState( newState )
  }

  createRecipe = () => {
    this.props.createRecipe( this.state )
  }

  contentChange = (key, value) => {
      console.log(key, 'the key in content change', value, 'the value')
      this.setState({ [`${ key }_directions`]: value })
  }
        /*<Direction value={ this.state[`${ stepNumber }_directions`] } disabled={ false } onChange={ e => this.setState({ [`${ stepNumber }_directions`]: e.target.value }) }></Direction>*/
  getDirections = d => {
    const stepNumber = Object.keys( d )[0]
    const direction = Object.values( d )[0]

    return (
      <StepContainer key={ stepNumber }>
        <Step>{ stepNumber }</Step>
        <ContentEditable
          tagName="div"
          className="my-class"
          content={ this.state[`${ stepNumber }_directions`] }
          editable={true}
          multiLine={ true }
          contentKey={ stepNumber }
          onChange={ this.contentChange }
        />
      </StepContainer>
    )
  }

  render() {
    const {
      title,
      cuisineType,
      recipeLink,
      id,
    } = this.state
    const {
      recipe
    } = this.props

    const ingredients = [ 'Meat 1lb', 'Eggs 2', 'Mirin 3oz', 'Soysauce 1tbs', ]

    return (
      <div>
        <Hero bg={ require(`../_res/serverImages/${ id }.jpg`)}>
          <HeroTitle>{ title }</HeroTitle>
        </Hero>
        <RecipeContainer>
          <RecipeContainerInner>
            <SubTitle> Ingredients </SubTitle>
            { ingredients.map( i => {
              return <Ingredient key={ i } value={ i } disabled={ false }></Ingredient>
            })}
            <Divider/>
            <SubTitle> Directions </SubTitle>
            { recipe.directions.map( d => this.getDirections( d ) )}
          </RecipeContainerInner>
        </RecipeContainer>
    {/*  <div onClick={ () => this.createRecipe() }> Click To Test </div>
      <label>Recipe Title</label><input type="text" onChange={ e => this.setState({ title: e.target.value })}/>
      <br/>
      <label>Recipe Link</label><input type="text" onChange={ e => this.setState({ recipeLink: e.target.value })}/>
      <br/>
      <label>Cuisine type</label><input type="text" onChange={ e => this.setState({ cuisineType: e.target.value })}/>
      <br/>
      <label>Directions</label><input type="text" onBlur={ e => this.setState({ [`${1}_directions`]: e.target.value }) }/>
      <label>Directions</label><input type="text" onBlur={ e => this.setState({ [`${2}_directions`]: e.target.value }) }/>
      <label>Image</label><input type="file" onChange={ e => this.setState({ image: e.target.files[0] }) } />*/}
      </div>
    )
  }
}


Recipe.propTypes = {
  recipe: PropTypes.object,

  createRecipe: PropTypes.func,
}


export default Recipe
