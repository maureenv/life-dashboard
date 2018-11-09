import { connect } from 'react-redux'
import actions from '../store/actions'
import api from '../store/api'
import Recipe from '../components/recipe'


const mapStateToProps = state => {
  console.log(recipe, 'the recipe in container')
  const { recipe } = state.recipes
  return { recipe }
}


// const mapDispatchToProps = dispatch => {
//   const getRecipe = id => api.getRecipe( dispatch, id )
//   const getRecipes = () => api.getRecipes( dispatch )
//   const createRecipe = recipe => api.createRecipe( dispatch, recipe )
//
//   return {
//     getRecipe,
//     getRecipes,
//     createRecipe,
//   }
// }


export default connect( mapStateToProps, undefined )( Recipe )
