import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {FaMoon} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {CgProfile} from 'react-icons/cg'
import ThemeContext from '../Context'

import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  const onClickLogo = () => {
    navigate.replace('/')
  }

  const [theme, setTheme] = useState('light')
  Cookies.set('themeMode', theme, {expires: 30})

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
    console.log(theme)
  }
  return (
    <div className="header-container">
      <div className="header-image">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="website-header-logo"
        />
      </div>
      <div className="header-elements">
        <button type="button" onClick={toggleTheme}>
          <FaMoon
            className="darkModeIcon"
            style={{
              width: 32,
              height: 40,
              marginRight: 10,
              cursor: 'pointer',
            }}
          />
        </button>
        <CgProfile className="profileIcon" style={{width: 32, height: 40}} />
        <button type="button" onClick={onClickLogout} className="button-logout">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
