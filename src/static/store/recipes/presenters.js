export const requestSaveRecipe = json => {
  const data = {
    cuisine_type: json.cuisineType,
    ingredients: json.ingredients,
    recipe_link: json.recipeLink,
    title: json.title,
    directions: json.directions,
  }
  return data
}
