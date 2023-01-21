import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import './App.css'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/trending" element={<Trending />} />
        <Route exact path="/gaming" element={<Gaming />} />
        <Route exact path="/videos/:id" element={<VideoItemDetails />} />
        <Route exact path="/saved" element={<SavedVideos />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
