import actions from '../actions'
import presenters from '../presenters'
import api from '../api'


export const createRecipe = ( dispatch, recipe ) => {
  const data = presenters.requestCreateRecipe( recipe )
  fetch('http://127.0.0.1:3001/recipes/new', {
    method: "POST",
    body: JSON.stringify( data ),
    headers: {'Content-Type': 'application/json'},
  })
  .then( response => response.json() )
  .then( data => {
    api.uploadFile( data._id, recipe.image )
    dispatch( actions.setRecipe( presenters.responseGeneric( data ) ))
  })
  .catch(( err )=> console.log( err, 'the error' ))
}


export const getRecipes = dispatch => {
  fetch( 'http://127.0.0.1:3001/recipes' )
  .then( response => response.json() )
  .then( data => dispatch( actions.getRecipes( presenters.responseGeneric( data ) )))
  .catch(( err ) => console.log( err, 'the error' ))
}
