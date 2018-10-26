import { connect } from 'react-redux'
import { setBlogs, setCurrentBlog } from '../actions/blog'
import Blog from '../pages/blog'


const mapStateToProps = state => {
  console.log(state, 'the state in blog container')
  const { currentBlog } = state.blogs

  return { currentBlog }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentBlog: id => dispatch(setCurrentBlog( id )),
    setBlogs: blogs => dispatch(setBlogs(blogs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)