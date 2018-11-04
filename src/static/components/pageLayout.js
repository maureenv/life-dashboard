import Meta from '../components/meta'
import Nav from '../components/nav'
export default ({ children }) => (
  <div>
    <Meta />
    <Nav />
    { children }
  </div>
)
