import { combineReducers } from 'redux'
import * as blog from './blog'

export default combineReducers({
  ...blog,
})
