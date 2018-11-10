import {
  SET_RECIPES,
  SET_RECIPE,
} from './actions'

const initialState = {
  recipes: [],
}


export const recipes = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'SET_RECIPES':
      return {
        ...state,
        recipes: action.recipes
      }
    case 'SET_RECIPE':
      return {
        ...state,
        recipe: action.recipe
      }
    default:
      return state
  }
}
