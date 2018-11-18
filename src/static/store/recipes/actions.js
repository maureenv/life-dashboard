export const createNewRecipe = isNew => ({
  type: 'CREATE_RECIPE',
  isNew
})

export const getRecipes = recipes => ({
  type: 'SET_RECIPES',
  recipes
})

export const setRecipe = ( recipe ) => ({
  type: 'SET_RECIPE',
  recipe,
})
