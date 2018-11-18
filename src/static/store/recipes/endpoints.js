import Router from 'next/router'

import actions from '../actions'
import presenters from '../presenters'
import api from '../api'


export const deleteRecipe = id => {
  fetch( `http://127.0.0.1:3001/recipes/delete/${ id }`, {
    method: "DELETE",
  })
  .then( response => response.json() )
  .then( data => {
    data = presenters.responseGeneric( data )
    Router.push('/index' )
    return data
  })
  .catch(( err ) => console.log( err, 'the error' ))
}


export const getRecipe = ( dispatch, id ) => {
  fetch( `http://127.0.0.1:3001/recipes/${ id }` )
  .then( response => response.json() )
  .then( data => {
    const recipe = presenters.responseGeneric( data )
    dispatch( actions.setRecipe({ isEditable: true, recipe }))
    Router.push('/recipe' )
  })
  .catch(( err ) => console.log( err, 'the error' ))
}


export const getRecipes = dispatch => {
  // fetch( 'http://127.0.0.1:3001/recipes' )
  // .then( response => response.json() )
  // .then( data => dispatch( actions.getRecipes( presenters.responseGeneric( data ) )))
  // .catch(( err ) => console.log( err, 'the error' ))
}

export const updateRecipe = recipe => {
  const data = presenters.requestSaveRecipe( recipe )
  console.log(data, 'the data going to be UDPATED')
  const updatedRecipe = fetch(`http://127.0.0.1:3001/recipes/update`, {
    method: "PUT",
    body: JSON.stringify( data ),
    headers: {'Content-Type': 'application/json'},
  })
  .then( response => response.json() )
  .then( async data => {
    const recipe = presenters.responseGeneric( data )
    Router.push(`/recipes/${ recipe.id }` )
  })
  .catch(( err )=> console.log( err, 'the error' ))

  return updatedRecipe
}


export const saveRecipe = recipe => {
  const data = presenters.requestSaveRecipe( recipe )
  const newRecipe = fetch('http://127.0.0.1:3001/recipes/new', {
    method: "POST",
    body: JSON.stringify( data ),
    headers: {'Content-Type': 'application/json'},
  })
  .then( response => response.json() )
  .then( async data => {
    const image = await api.uploadFile( data._id, recipe.image )
    if ( image ) {
      console.log(image, 'the image')
      const recipe = presenters.responseGeneric( data )
      console.log(recipe.id, 'this recipe now has an id')
      Router.push(`/recipes/${ recipe.id }` )
      return recipe
    }
  })
  .catch(( err )=> console.log( err, 'the error' ))

  return newRecipe
}
