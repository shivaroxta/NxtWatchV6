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

      <Route
        exact
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/trending"
        element={
          <ProtectedRoute>
            <Trending />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/gaming"
        element={
          <ProtectedRoute>
            <Gaming />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/videos/:id"
        element={
          <ProtectedRoute>
            <VideoItemDetails />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/saved"
        element={
          <ProtectedRoute>
            <SavedVideos />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default App
