import { connect } from 'react-redux'
import actions from '../store/actions'
import Recipes from '../components/recipes'


const mapStateToProps = state => {
  console.log(state, 'the state in blog container')
  const { currentBlog } = state.blogs

  return { currentBlog }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentBlog: id => dispatch(actions.setCurrentBlog( id )),
    setBlogs: blogs => dispatch(actions.setBlogs(blogs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Recipes )
