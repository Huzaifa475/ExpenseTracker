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
        <Route path='/header' element={<Header />} />
        <Route path='/home' element={<Home />} />
        <Route path='/income' element={<Income />} />
        <Route path='/expense' element={<Expense />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
