import { connect } from 'react-redux'
import actions from '../store/actions'
import coordinators from '../store/coordinators'
import api from '../store/api'
import Recipes from '../components/recipes'


const mapStateToProps = state => {
  const { recipe, recipes } = state.recipes
  return { recipe, recipes }
}


const mapDispatchToProps = dispatch => {
  const createNewRecipe = () => coordinators.createNewRecipe( dispatch )
  const getRecipe = id => api.getRecipe( dispatch, id )
  const getRecipes = () => api.getRecipes( dispatch )
  const saveRecipe = recipe => api.saveRecipe( dispatch, recipe )

  return {
    //createNewRecipe: () => dispatch( actions.createRecipe( true ) ),
    createNewRecipe,
    getRecipe,
    getRecipes,
    saveRecipe,
  }
}


export default connect( mapStateToProps, mapDispatchToProps )( Recipes )
