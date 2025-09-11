import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import SignupForm from './components/Signup'
import VerifyEmail from './components/VerifyEmail'
import Login from './components/Login'
import LogoutButton from './components/Logout'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div className='bg-dark min-h-screen'>
      <Routes>
        {/* Redirect root to /register */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route path="/register" element={<SignupForm />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App