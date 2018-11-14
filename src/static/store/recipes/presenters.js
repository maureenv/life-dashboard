export const requestSaveRecipe = json => {
  const directions = []
  const entries = Object.entries( json )
  for ( const [key, value] of entries ) {
    if ( key.includes("directions") ) {
      const number = key.split("_")[0]
      directions.push({[number]:value})
    }
  }

  const data = {
    cuisine_type: json.cuisineType,
    ingredients: json.ingredients,
    recipe_link: json.recipeLink,
    title: json.title,
    directions: directions,
  }
  return data
}
