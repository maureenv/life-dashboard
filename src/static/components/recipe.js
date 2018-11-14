import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import ContentEditable from './contentEditable'
import pencil from '../_res/images/pencil.svg'
import camera from '../_res/images/photo-camera.svg'


const Hero = styled.div`
  background: url(${ props => props.bg }) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 30vh;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  flex-direction: column;
  z-index: 0;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  }
`

const HeroTitle = styled.div`
  color: #f5f5f5;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  bottom: 0;
  text-transform: uppercase;
  font-size: 100px;
  margin-bottom: -10px;
  padding: 0 30px;
  font-family: 'Anton', sans-serif;
  text-shadow: -3px 0px 11px rgba(0,0,0,0.7);
  position: relative;
`

const ImageUploader = styled.label`
  display: ${ props => props.show ? 'flex' : 'none'};
  color: #f5f5f5;
  position: relative;
  z-index: 1;
  font-family: 'Roboto', sans-serif;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
  cursor: pointer;
  text-shadow: -3px 0px 11px rgba(0,0,0,0.7);
  transition: all 0.2s ease-in-out;
`

const Camera = styled.img`
  width: 50px;
`

const EditableIndicator = styled.div`
  ${({ show, small }) => show && `
    &:hover {
    position: relative;
    z-index: 2;
      &::after {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        fill: #fff;
        background: url(${ pencil }) no-repeat;
        background-size: 30px;
        top: ${ small ? "-10px" : "-10px" };
        right: ${ small ? "-10px" : "-15px" };
        pointer-events: none;
      }
    }
  `}
`

const RecipeContainer = styled.div`
  width: 100%;
  background: #f5f5f5;
  position: relative;
  z-index: 1;
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
  padding: 3px 10px;
  padding-right: 30px;
  min-width: 150px;
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
  padding: 3px 10px;
  overflow-wrap: break-word;
  min-width: 150px;
  padding-right: 30px;
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
`

const VideoContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%;
  box-shadow: 0px 5px 20px 8px rgba(0,0,0,0.2);
  background: #666;
`

const Iframe = styled.iframe`
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
`

const VideoLabel = styled.label`
  white-space: nowrap;
  font-weight: 600;
`

const VideoLinkContainer = styled.div`
  opacity: ${ props => props.show? 1 : 0 };
  position: absolute;
  color: #f5f5f5;
  z-index: 2;
  height: 30px;
  width: 120px;
  background: red;
  top: 0;
  left: -25px;
  display: flex;
  font-family: 'Roboto', sans-serif;
  align-items: center;
  margin: 15px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  &:hover {
    width: 95%;
  }
  ${ VideoContainer }:hover & {
    opacity: 1;
  }
  &::after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 10px 0;
    position: absolute;
    left: 0;
    bottom: -10px;
    border-color: transparent #7d0000 transparent transparent;
  }
`
const VideoLink = styled.input`
  font-family: 'Roboto', sans-serif;
  color: #f5f5f5;
  background: none;
  border: none;
  font-size: 16px;
  width: 100%;
  display: inline-block;
  padding: 0 10px;
  box-sizing: border-box;
`

const VideoEditIcon = styled.img`
  width: 20px;
  margin-right: 5px;
`

class Recipe extends Component {

  state = {
    title: "Add Title",
    directions: [],
    ingredients: [],
  }

  componentWillMount() {
    const { isEditable, recipe } = this.props

    if ( recipe.id ) {
      this.buildState( this.props.recipe )
    }
    else {
      this.newForm()
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.recipe !== this.props.recipe ) {
      this.buildState( nextProps.recipe )
    }
  }

  newForm() {
    const { directions, ingredients } = this.state
    directions.push({ 1: "Add Direction" })
    ingredients.push({ 1: "Add Ingredient" })
    this.setState({ visibleImage: '' })
  }

  buildState( recipe ) {
    const newState = {}
    newState['title'] = recipe.title
    newState['cuisineType'] = recipe.cuisineType
    newState['id'] = recipe.id
    newState['recipeLink'] = recipe.recipeLink && recipe.recipeLink.replace("watch?v=", "embed/").concat('?rel=0&amp;showinfo=0')
    newState['directions'] = []
    newState['ingredients'] = []

    if ( recipe.directions && recipe.directions.length ) {
      recipe.directions.map( d => {
        newState['directions'].push({ [`${ Object.keys( d ) }`]: Object.values( d )[0] })
      })
    }
    else {
      newState['directions'].push({ 1: "Add Direction" })
    }
    if ( recipe.ingredients && recipe.ingredients.length ) {
      recipe.ingredients.map( i => {
        newState['ingredients'].push({ [`${ Object.keys( i ) }`]: Object.values( i )[0] })
      })
    }
    else {
      newState['ingredients'].push({ 1: "Add Ingredient" })
    }
    this.setState( newState )
  }

  saveRecipe = () => {
    this.props.saveRecipe( this.state )
  }

  contentChange = ({ contentKey, value, arrayPosition }) => {
    console.log('on blur called')
    if ( value ) {
      console.log(value, 'has value')
      const valuesArray = [ ...this.state[ contentKey ] ]
      valuesArray[ arrayPosition ] = { [arrayPosition + 1]: value }
      this.setState({ [ contentKey ]: valuesArray }, () => this.addEditableFields() )
    } else {
      this.addEditableFields()
    }
  }

  updateSingleField = ({ contentKey, value }) => {
    if ( contentKey === 'title' && value === '' ) {
      value = 'Add Title'
    }
    this.setState({ [contentKey]: value })
  }

  clearPlaceholder = ({ contentKey, value, arrayPosition }) => {
    if ( value ) {
      if ( value === "Add Ingredient" || value === "Add Direction") {
        const valuesArray = [ ...this.state[ contentKey ] ]
        valuesArray[ arrayPosition ] = { [arrayPosition + 1]: "" }
        this.setState({ [ contentKey ]: valuesArray }, () => console.log( {[contentKey]: valuesArray}, 'the changed value'))
      }
    }
    // }
    // else {
    //   this.setState({ testing: 'test' })
    //   this.addEditableFields()
    // }
  }

  editSingleField = ({ value, key, tagName }) => {
    const isEditable = true
    return (
      <EditableIndicator show={ isEditable } small={ false }>
        <ContentEditable
          tagName={ tagName }
          content={ value }
          editable={ true }
          multiLine={ true }
          contentKey={ key }
          onBlur={ this.updateSingleField }
        />
      </EditableIndicator>
    )
  }

  getContent = ({ content, key, tagName }) => {
      const stepNumber = Object.keys( content )[0]
      const valueArrayPosition = this.state[key][stepNumber -1]
      let value = valueArrayPosition && Object.values( valueArrayPosition )[0]

      const newEditableValue = value === "Add Ingredient" || value === "Add Direction"
      const isEditable = true
      return (
        <StepContainer key={ stepNumber }>
          <Step>{ stepNumber }</Step>
          <EditableIndicator show={ isEditable } small={ true }>
            <ContentEditable
              tagName={ tagName }
              focus={ value.length === 0 }
              content={ value }
              editable={ true }
              style={{ color: newEditableValue && "#a7a7a7" }}
              multiLine={ true }
              contentKey={ key }
              arrayPosition={ stepNumber - 1 }
              onBlur={ this.contentChange }
              onFocus={ this.clearPlaceholder }
            />
          </EditableIndicator>
        </StepContainer>
      )
  }

  uploadImage = e => {
    if ( e.target.files ) {
      this.setState({
        image: e.target.files[0],
        visibleImage: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  addEditableFields = () => {
    const { directions, ingredients } = this.state

console.log( Object.values( ingredients[ingredients.length -1 ] )[0], 'the value of ingredient')
    if ( Object.values( ingredients[ingredients.length -1 ] )[0] !==  "Add Ingredient") {
      console.log(Object.values( ingredients[ingredients.length -1 ] )[0], 'im in loop')
      const newArray = [ ...ingredients, { [ingredients.length + 1 ]: "Add Ingredient" } ]
      this.setState({ ingredients: newArray })
    }

    if ( Object.values( directions[directions.length -1 ] )[0] !== ( "Add Direction" || "" || undefined ) ) {
      const newArray = [ ...directions, { [directions.length + 1 ]: "Add Direction" } ]
      this.setState({ directions: newArray })
    }
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

    const {
      recipe,
      isEditable
    } = this.props

    if ( isEditable ) {
      this.addEditableFields()
    }

    return (
      <div>
        <Hero bg={ this.state.visibleImage ? this.state.visibleImage : recipe.id && require(`../_res/serverImages/${ id }.jpg`)}>
          <input style={{ display: 'none' }} id="image-upload" type="file" onChange={ e => this.uploadImage( e ) } />
          <ImageUploader show={ isEditable } htmlFor="image-upload"><Camera src={ camera } alt="camera"/><p>Upload New Image</p></ImageUploader>
          { isEditable ? this.editSingleField({ value: title, key: 'title', tagName: HeroTitle }) : <HeroTitle>{ title }</HeroTitle> }
        </Hero>
        <RecipeContainer>
          <RecipeContainerInner>
            <Divider/>
            <SubTitle> Ingredients </SubTitle>
              { ingredients.map( i => this.getContent({ content: i, key: 'ingredients', tagName: Ingredient }) )}
            <Divider/>
            <SubTitle> Directions </SubTitle>
            { directions.map( d => this.getContent({ content: d , key: 'directions', tagName: Direction }) )}
            <Divider/>
            <VideoContainer>
              <VideoLinkContainer show={ !recipe.id }><VideoEditIcon src={ pencil }/><VideoLabel>Video Link</VideoLabel> <VideoLink placeholder="http://wwww.youtube.com..." value={ recipeLink } onChange={ e => this.setState({ recipeLink: e.target.value })}/> </VideoLinkContainer>
              <Iframe width="560" height="315" src={ recipeLink } frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></Iframe>
            </VideoContainer>
            <Divider/>
          </RecipeContainerInner>
        </RecipeContainer>
      </div>
    )
  }
}


Recipe.propTypes = {
  isEditable: PropTypes.bool,
  recipe: PropTypes.object,

  saveRecipe: PropTypes.func,
}

Recipe.defaultProps = {
  recipe: PropTypes.object,

  saveRecipe: PropTypes.func,
}

export default Recipe
