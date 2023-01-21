import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const VideoItemDetails = () => {
  const {id} = useParams()
  const [videoItemDetails, setVideoItemDetails] = useState([])
  // eslint-disable-next-line
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const fetchedData = eachVideo => ({
    id: eachVideo.id,
    title: eachVideo.title,
    videoUrl: eachVideo.video_url,
    thumbnailUrl: eachVideo.thumbnail_url,
    channelName: eachVideo.channel.name,
    channelProfileImageUrl: eachVideo.channel.profile_image_url,
    channelSubscriberCount: eachVideo.channel.subscriber_count,
    viewCount: eachVideo.view_count,
    publishedAt: eachVideo.published_at,
    description: eachVideo.description,
  })

  const getVideoItemDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = fetchedData(data.video_details)

      setApiStatus(apiStatusConstants.success)
      setVideoItemDetails(updatedData)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getVideoItemDetails()
  })

  const {
    // eslint-disable-next-line
    channel,
    // eslint-disable-next-line
    description,
    // eslint-disable-next-line
    viewCount,
    videoUrl,
    // eslint-disable-next-line
    title,
    // eslint-disable-next-line
    publishedAt,
    // eslint-disable-next-line
    videoSaved,
  } = videoItemDetails

  return (
    <>
      <Header />
      <div className="video">
        <Sidebar />
        <div className="video-item-details">
          <ReactPlayer
            style={{height: '70vh'}}
            key={id}
            controls
            url={videoUrl}
          />
        </div>
      </div>
    </>
  )
}

export default VideoItemDetails
