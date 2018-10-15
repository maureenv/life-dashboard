import {
  SET_BLOGS,
  SET_CURRENT_BLOG,
} from '../actions/blog'

const initialState = {
  blogs: [],
  currentBlog: 'test',
}

export const blogs = ( state = initialState, action ) => {
  console.log('reducer called')
  switch ( action.type ) {
    case 'SET_BLOGS':
      return {
        ...state,
        blogs: action.blogs,
      }
    case 'SET_CURRENT_BLOG':
    console.log(action.currentBlog, 'current blog in reducer')
      return {
        ...state,
        currentBlog: action.currentBlog
      }
    default:
      return state
  }
}
