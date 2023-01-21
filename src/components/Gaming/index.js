import {useState, useEffect} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Gaming = () => {
  const [gamingVideos, setGamingVideos] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getGamingVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))
      setGamingVideos(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getGamingVideos()
  }, [])

  const renderGamingLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderGamingVideosFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt="failed view"
      className="no videos"
    />
  )

  const renderGamingVideosListView = () => (
    <ul className="gaming-videos-list">
      {gamingVideos.map(eachItems => (
        <Link to={`videos/${eachItems.id}`}>
          <li className="gaming-videos-item" key={eachItems.id}>
            <img
              src={eachItems.thumbnailUrl}
              alt="gaming video"
              className="gaming-video-image"
            />
            <h1 className="gaming-video-header">{eachItems.title}</h1>
            <p className="gaming-video-paragraph">{eachItems.viewCount}</p>
          </li>
        </Link>
      ))}
    </ul>
  )

  const renderAllGamingVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderGamingVideosListView()
      case apiStatusConstants.failure:
        return renderGamingVideosFailureView()
      case apiStatusConstants.inProgress:
        return renderGamingLoadingView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="gaming">
        <Sidebar />

        <div className="gaming-container">
          <div className="gaming-icon">
            <p className="gaming-icon-top">
              <SiYoutubegaming
                style={{
                  marginRight: '5',
                  marginLeft: '100',
                  fontSize: '50',
                }}
              />
            </p>
            <p className="items-top" style={{fontSize: '15px'}}>
              Gaming
            </p>
          </div>
          <div className="gaming-elements">{renderAllGamingVideos()}</div>
        </div>
      </div>
    </>
  )
}

export default Gaming
