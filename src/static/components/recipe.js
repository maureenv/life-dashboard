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
  max-width: 750px;
  padding: 0 20px;
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

const Ingredient = styled.div`
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

const Direction = styled.div`
  color: #666;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 1.3;
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

const VideoContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%;
  box-shadow: 0px 5px 20px 8px rgba(0,0,0,0.2);
`

const Iframe = styled.iframe`
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
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
    newState['recipeLink'] = recipe.recipeLink.replace("watch?v=", "embed/").concat('?rel=0&amp;showinfo=0')
    newState['directions'] = []
    newState['ingredients'] = []

    if ( recipe.directions.length ) {
      recipe.directions.map( d => {
        newState['directions'].push({ [`${ Object.keys( d ) }`]: Object.values( d )[0] })
      })
    }
    else {
      newState['directions'].push({ 1: "Add Ingredient" })
    }

    if ( recipe.ingredients.length ) {
      recipe.ingredients.map( i => {
        newState['ingredients'].push({ [`${ Object.keys( i ) }`]: Object.values( i )[0] })
      })
    }
    else {
      newState['ingredients'].push({ 1: "Add direction" })
    }
    this.setState( newState )
  }

  createRecipe = () => {
    this.props.createRecipe( this.state )
  }

  contentChange = ({ contentKey, value, arrayPosition }) => {
    if ( value ) {
      const valuesArray = [ ...this.state[ contentKey ] ]
      valuesArray[ arrayPosition ] = { [arrayPosition + 1]: value }
      this.setState({ [ contentKey ]: valuesArray })
    }
  }

  getContent = ({ content, key, tagName }) => {
    const isEditable = true
    const stepNumber = Object.keys( content )[0]
    const valuePosition = this.state[key][stepNumber -1]
    const value = valuePosition && Object.values( valuePosition )[0]

    return (
      <StepContainer key={ stepNumber }>
        <Step>{ stepNumber }</Step>
        <ContentEditable
          tagName={ tagName }
          className="my-class"
          content={ value }
          editable={ true }
          multiLine={ true }
          contentKey={ key }
          arrayPosition={ stepNumber - 1 }
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
      directions,
      ingredients,
    } = this.state
    console.log(ingredients, 'the directions')

    const {
      recipe
    } = this.props
    const isEditable = false

    return (
      <div>
        <Hero bg={ require(`../_res/serverImages/${ id }.jpg`)}>
          <HeroTitle>{ isEditable ? 'Add Recipe Name' : title }</HeroTitle>
        </Hero>
        <RecipeContainer>
          <RecipeContainerInner>
            <SubTitle> Ingredients </SubTitle>
            { ingredients.map( i => this.getContent({ content: i , key: 'ingredients', tagName: Ingredient }))}
            <Divider/>
            <SubTitle> Directions </SubTitle>
            { directions.map( i => this.getContent({ content: i , key: 'directions', tagName: Direction }))}
            <Divider/>
            <VideoContainer>
              <Iframe width="560" height="315" src={ recipeLink } frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></Iframe>
            </VideoContainer>
            <Divider/>
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
  isEditable: PropTypes.bool,
  recipe: PropTypes.object,

  createRecipe: PropTypes.func,
}

Recipe.defaultProps = {
  recipe: PropTypes.object,
  edit: true,

  createRecipe: PropTypes.func,
}

export default Recipe
