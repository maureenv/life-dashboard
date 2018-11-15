import { connect } from 'react-redux'
import actions from '../store/actions'
import api from '../store/api'
import Recipe from '../components/recipe'


const mapStateToProps = state => {
  const { recipe, isEditable } = state.recipes
  return {
    isEditable,
    recipe
  }
}


const mapDispatchToProps = dispatch => {
  const saveRecipe = recipe => api.saveRecipe( dispatch, recipe )

  return {
    saveRecipe,
  }
}


export default connect( mapStateToProps, mapDispatchToProps )( Recipe )
