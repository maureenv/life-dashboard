import { connect } from 'react-redux'
import actions from '../store/actions'
import api from '../store/api'
import Recipes from '../components/recipes'


const mapStateToProps = state => {
  const { recipes } = state.recipes
  console.log(recipes, 'the recipes')
  return { recipes }
}

const mapDispatchToProps = dispatch => {
  const getRecipes = () => api.getRecipes( dispatch )

  return {
    getRecipes,
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Recipes )
