import {NavLink} from 'react-router-dom'
// eslint-disable-next-line
import {useState, useEffect} from 'react'
import {MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {HiFire} from 'react-icons/hi'
import {AiFillHome} from 'react-icons/ai'
import './index.css'

const Sidebar = () => (
  <div className="filter-groups">
    <ul className="filter">
      <NavLink
        to="/"
        style={{textDecoration: 'none', color: 'inherit'}}
        className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        <ul className="icon">
          <li className="icon">
            <p>
              <AiFillHome style={{marginLeft: '5'}} />
            </p>
            <p className="item" style={{fontSize: '15px', marginLeft: '15'}}>
              Home
            </p>
          </li>
        </ul>
      </NavLink>
      <NavLink
        to="/trending"
        style={{textDecoration: 'none', color: 'inherit'}}
        className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        <ul className="icon">
          <li className="icon">
            <p>
              <HiFire style={{marginRight: '5', marginLeft: '5'}} />
            </p>
            <p className="item" style={{fontSize: '15px'}}>
              Trending
            </p>
          </li>
        </ul>
      </NavLink>
      <NavLink
        to="/gaming"
        style={{textDecoration: 'none', color: 'inherit'}}
        className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        <ul className="icon">
          <li className="icon">
            <p>
              <SiYoutubegaming style={{marginRight: '5', marginLeft: '5'}} />
            </p>
            <p className="item" style={{fontSize: '15px'}}>
              Gaming
            </p>
          </li>
        </ul>
      </NavLink>

      <NavLink
        to="/saved"
        style={{textDecoration: 'none', color: 'inherit'}}
        className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        <ul className="icon">
          <li className="icon">
            <p>
              <MdPlaylistAdd style={{marginRight: '5', marginLeft: '5'}} />
            </p>
            <p className="item" style={{fontSize: '15px'}}>
              Saved Videos
            </p>
          </li>
        </ul>
      </NavLink>
    </ul>
    <div className="contact">
      <h1 className="contact-us">CONTACT US</h1> <br />
      <div className="sites">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          className="fb site"
          alt="facebook"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          className="tw site"
          alt="twitter"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          className="ln site"
          alt="linkdn"
        />
      </div>
    </div>
  </div>
)

export default Sidebar
