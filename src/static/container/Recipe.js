import { connect } from 'react-redux'
import actions from '../store/actions'
import api from '../store/api'
import Recipe from '../components/recipe'


const mapStateToProps = state => {
  const { recipe } = state.recipes
  return { recipe }
}


export default connect( mapStateToProps, undefined )( Recipe )
