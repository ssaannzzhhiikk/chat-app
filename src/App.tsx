import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Reset from './pages/Reset'
import Chat from './pages/Chat'
import ProtectedRoute from './auth/ProtectedRoute'
import { UserProvider } from './contexts/UserContext'

export default function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<Reset />} />

        <Route
        path='/chat'
        element={
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>}
        />

        <Route path="*" element={<Login />} /> {/* Redirect по умолчанию */}
      </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}
