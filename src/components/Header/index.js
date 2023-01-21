import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {FaMoon} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'

import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate()
  const [theme, setTheme] = useState('light-theme')

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  const onClickLogo = () => {
    navigate.replace('/')
  }

  const onClickDarkMode = () => {
    if (theme === 'dark-theme') {
      setTheme('light-theme')
    } else {
      setTheme('light-theme')
    }
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className="header-container">
      <div className="header-image">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          onClick={onClickLogo}
          className="website-header-logo"
        />
      </div>
      <div className="header-elements">
        <FaMoon
          className="darkModeIcon"
          onClick={onClickDarkMode}
          style={{width: 32, height: 40, marginRight: 10, cursor: 'pointer'}}
        />
        <CgProfile className="profileIcon" style={{width: 32, height: 40}} />
        <button type="button" onClick={onClickLogout} className="button-logout">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
