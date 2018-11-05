import * as recipesPresenters from './recipes/presenters'
import { camelCaseify, snakeCaseify } from '../utils'


export const responseGeneric = json => {
  return camelCaseify( json )
}

export const requestGeneric = json => {
  return snakeCaseify( json )
}

export default {
  ...recipesPresenters,
  requestGeneric,
  responseGeneric,
}
