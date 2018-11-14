export const createNewRecipe = isNew => ({
  type: 'CREATE_RECIPE',
  isNew
})

export const getRecipes = recipes => ({
  type: 'SET_RECIPES',
  recipes
})

export const setRecipe = ({ isEditable, recipe }) => ({
  type: 'SET_RECIPE',
  isEditable,
  recipe,
})
