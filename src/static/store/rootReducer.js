import { combineReducers } from 'redux'
import * as recipe from './recipes/reducers'

export default combineReducers({
  ...recipe,
})
