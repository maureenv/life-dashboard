import {
  SET_BLOGS,
  SET_CURRENT_BLOG,
  SET_RECIPES,
} from './actions'

const initialState = {
  blogs: [],
  currentBlog: 'test',
  recipes: [],
}


export const recipes = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'SET_BLOGS':
      return {
        ...state,
        blogs: action.blogs,
      }
    case 'SET_CURRENT_BLOG':
      return {
        ...state,
        currentBlog: action.currentBlog
      }
    case 'SET_RECIPES':
      console.log(action.recipes, 'THE RECIPES IN reducer')
      return {
        ...state,
        recipes: action.recipes
      }
    default:
      return state
  }
}
