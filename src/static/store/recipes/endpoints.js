import Router from 'next/router'

import actions from '../actions'
import presenters from '../presenters'
import api from '../api'


export const deleteRecipe = id => {
  console.log(id, 'the id in endpoint')
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
  console.log('In recipe endpoint')
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
      const recipe = presenters.responseGeneric( data )
      return recipe
    }
  })
  .catch(( err )=> console.log( err, 'the error' ))

  return newRecipe
}
