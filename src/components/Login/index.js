import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [isErr, setIsErr] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const renderSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/')
  }

  const renderFailureLogin = message => {
    setIsErr(true)
    setErrMsg(message)
  }

  const onChangeUsername = event => {
    setUsernameInput(event.target.value)
  }

  const onChangePassword = event => {
    setPasswordInput(event.target.value)
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    const userDetails = {username: usernameInput, password: passwordInput}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      renderSuccessLogin(data.jwt_token)
    } else {
      renderFailureLogin(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <div className="login">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="website-logo"
        />
        <br />
        <form onSubmit={onSubmitForm}>
          <label className="username-label label" htmlFor="usernameInput">
            USERNAME
          </label>
          <br />
          <input
            className="username-input"
            id="usernameInput"
            type="text"
            placeholder="Username"
            onChange={onChangeUsername}
            value={usernameInput}
          />
          <br />
          <label className="password-label label" htmlFor="passwordInput">
            PASSWORD
          </label>
          <br />
          <input
            className="password-input"
            id="passwordInput"
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
            value={passwordInput}
          />
          <br />
          <button type="submit" className="loginButton">
            Login
          </button>
          {isErr && <p className="error">*{errMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
