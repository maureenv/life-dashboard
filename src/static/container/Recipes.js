import { connect } from 'react-redux'
import actions from '../store/actions'
import api from '../store/api'
import Recipes from '../components/recipes'


const mapStateToProps = state => {
  const { recipe, recipes } = state.recipes
  return { recipe, recipes }
}


const mapDispatchToProps = dispatch => {
  const getRecipe = id => api.getRecipe( dispatch, id )
  const getRecipes = () => api.getRecipes( dispatch )
  const createRecipe = recipe => api.createRecipe( dispatch, recipe )

  return {
    getRecipe,
    getRecipes,
    createRecipe,
  }
}


export default connect( mapStateToProps, mapDispatchToProps )( Recipes )
