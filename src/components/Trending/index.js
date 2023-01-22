import {HiFire} from 'react-icons/hi'
import {useState, useEffect, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Sidebar from '../Sidebar'
import DarkModeContext from '../../context/DarkModeContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Trending = () => {
  const [trendingVideos, setTrendingVideos] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {darkMode} = useContext(DarkModeContext)

  const getTrendingVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    console.log({jwtToken})

    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channelName: eachVideo.channel.name,
        channelProfileImageUrl: eachVideo.channel.profile_image_url,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      setApiStatus(apiStatusConstants.success)
      console.log('success')
      setTrendingVideos(updatedData)
    } else {
      setApiStatus(apiStatusConstants.failure)
      console.log('failure')
    }
  }

  useEffect(() => {
    getTrendingVideos()
    // eslint-disable-next-line
  }, [])

  const renderVideosFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt="failed view"
      className="no videos"
    />
  )

  const renderVideosListView = () => (
    <ul className="trending-videos-list">
      {trendingVideos.map(eachItem => (
        <NavLink to={`videos/${eachItem.id}`}>
          <li className="trending-video-item" key={eachItem.id}>
            <div className="trending-video-image">
              <img
                src={eachItem.thumbnailUrl}
                alt="trending video"
                className="trending-video-item-image"
              />
            </div>
            <div className="trending-video-details">
              <h1 className="trending-video-heading">{eachItem.title}</h1>{' '}
              <br />
              <p className="trending-video-channel-name">
                {eachItem.channelName}
              </p>{' '}
              <br />
              <p className="trending-video-view-count">{eachItem.view_count}</p>
              <p className="trending-video-date">{eachItem.publishedAt}</p>
            </div>
          </li>
        </NavLink>
      ))}
    </ul>
  )

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderAllTrendingElements = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosListView()
      case apiStatusConstants.failure:
        return renderVideosFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className={`trending ${darkMode ? 'dark-mode' : ''}`}>
        <Sidebar />

        <div className="trending-container">
          <div className="trending-icon">
            <p className="trending-icon-top">
              <HiFire
                style={{
                  marginRight: '5',
                  marginLeft: '100',
                  fontSize: '50',
                }}
              />
            </p>
            <p className="item-top" style={{fontSize: '15px'}}>
              Trending
            </p>
          </div>
          <div className={`trending-elements ${darkMode ? 'dark-mode' : ''}`}>
            {renderAllTrendingElements()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Trending
