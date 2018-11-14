import Router from 'next/router'
import actions from '../actions'


export const createNewRecipe = ( dispatch ) => {
  dispatch( actions.createNewRecipe())
  Router.push('/recipe' )
}
