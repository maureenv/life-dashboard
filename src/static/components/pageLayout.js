import Meta from '../components/meta'
import Nav from '../components/nav'
import MyDocument from '../pages/_document'

export default ({ children }) => (
  <div>
    {/*<Meta />*/}
    <Nav />
    { children }
  </div>
)
