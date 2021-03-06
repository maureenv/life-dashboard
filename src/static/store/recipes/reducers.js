import {
  CREATE_RECIPE,
  SET_RECIPES,
  SET_RECIPE,
} from './actions'

const initialState = {
  recipe: [],
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
        recipe: action.recipe,
        isEditable: action.isEditable,
      }
    case 'CREATE_RECIPE':
      return {
        ...state,
        recipe: initialState.recipe
      }
    default:
      return state
  }
}
