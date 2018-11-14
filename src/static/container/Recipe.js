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


export default connect( mapStateToProps, undefined )( Recipe )
