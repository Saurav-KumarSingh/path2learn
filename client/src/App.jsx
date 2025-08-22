
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import SignupForm from './components/Signup'
import VerifyEmail from './components/VerifyEmail'
import Login from './components/Login'

const App = () => {
  return (
    <div className='bg-dark min-h-screen'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<SignupForm/>}/>
        <Route path='/verify' element={<VerifyEmail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      
      
    </div>
  )
}

export default App