import actions from '../actions'


export const getRecipes = dispatch => {
  console.log(dispatch, 'dispatch')
    fetch( 'http://127.0.0.1:3001/recipes' )
    .then( response => response.json() )
    .then( data => dispatch( actions.getRecipes( data )))
    .catch(( err) => console.log( err, 'the error' ))
}
