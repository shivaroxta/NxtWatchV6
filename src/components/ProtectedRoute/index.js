import Cookies from 'js-cookie'
import {Outlet, Navigate} from 'react-router-dom'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" />
  }
  return <Outlet {...props} />
}

export default ProtectedRoute
