import {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Sidebar from '../Sidebar'
// AiOutlineSearch
import Header from '../Header'
import ThemeContext from '../Context'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const Home = () => {
  const [videosList, setVideosList] = useState([])
  const [searchBarEl, setSearchBarEl] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getVideoItems = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    console.log({jwtToken})
    const url = `https://apis.ccbp.in/videos/all?search=${searchBarEl}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channelName: eachVideo.channel.name,
        channelProfileImageUrl: eachVideo.channel.profile_image_url,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      setApiStatus(apiStatusConstants.success)
      setVideosList(updatedData)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getVideoItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchBar = event => {
    setSearchBarEl(event.target.value)
  }

  const onEnterSearchInput = () => {
    getVideoItems()
  }

  const renderFailureView = () => {
    ;<img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt="failed view"
      className="no videos"
    />
  }

  const renderProductsListView = () => {
    const shouldShowProductsList = videosList.length > 0

    return shouldShowProductsList ? (
      <ul className="videos-playlist">
        {videosList.map(eachVideo => (
          <NavLink to={`videos/${eachVideo.id}`}>
            <li className="video-item" key={eachVideo.id}>
              <img
                src={eachVideo.thumbnailUrl}
                alt="video"
                className="video-list-item"
              />{' '}
              <br />
              <div className="video-container">
                <div className="video-top">
                  <img
                    src={eachVideo.channelProfileImageUrl}
                    alt="video"
                    className="video-profile-item"
                  />
                </div>
                <div className="video-bottom">
                  <p className="description">{eachVideo.title}</p>
                  <p className="channel-name">{eachVideo.channelName}</p>
                  <div className="count-published">
                    <p className="view-count">{eachVideo.viewCount}</p>
                    <p className="published">{eachVideo.publishedAt}</p>
                  </div>
                </div>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="no-videos"
        />
      </div>
    )
  }

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderAllProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsListView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }
  const themes = Cookies.get('theme')
  console.log(themes)
  return (
    <>
      <Header />
      <div className={`home ${themes}`}>
        <Sidebar />
        <div className="home-container">
          <div className="logo-search">
            <div className="bg-container">
              <div className="home-banner-logo">
                <div className="home-page">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="website-home-logo"
                  />{' '}
                  <br />
                  <p className="home-paragraph">
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>
                  <br />
                  <button className="get-button" type="button">
                    Get It Now
                  </button>
                </div>
                <div className="home-image">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
                    alt="website-home-banner"
                    className="website-home-banner"
                  />
                </div>
              </div>
              <div className="search-videos">
                <input
                  type="search"
                  className="search-bar"
                  onChange={searchBar}
                  placeholder="Search"
                  value={searchBarEl}
                  onKeyDown={onEnterSearchInput}
                />
              </div>
              <div>
                <div className="videos-home-list">{renderAllProducts()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
