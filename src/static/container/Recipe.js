import { connect } from 'react-redux'
import actions from '../store/actions'
import api from '../store/api'
import Recipe from '../components/recipe'


const mapStateToProps = state => {
  console.log(recipe, 'the recipe in container')
  const { recipe } = state.recipes
  return { recipe }
}


export default connect( mapStateToProps, undefined )( Recipe )
