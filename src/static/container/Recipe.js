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

  return {
    saveRecipe: async data => {
      const recipe = await api.saveRecipe( data )
      if ( recipe ) {
        console.log(recipe, data, 'the recipe in container')
            //api.uploadFile( data._id, recipe.image )
        dispatch( actions.setRecipe({ isEditable: true, recipe }))
      }
    },
    deleteRecipe: async id => {
      const data = await api.deleteRecipe( id )
      if ( data ) {
        dispatch( actions.getRecipes( data ))
      }
    }
  }
}


export default connect( mapStateToProps, mapDispatchToProps )( Recipe )
