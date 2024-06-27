import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Income from './pages/income/Income'
import Expense from './pages/expense/Expense'
import Header from './components/header/Header'
import Profile from './pages/profile/Profile'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/api/v1/header' element={<Header />} />
        <Route path='/api/v1/home' element={<Home />} />
        <Route path='/api/v1/income' element={<Income />} />
        <Route path='/api/v1/expense' element={<Expense />} />
        <Route path='/api/v1/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
