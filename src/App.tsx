import React from 'react'
import './styles/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddUserPage from './pages/AddUserPage'
import EditUserPage from './pages/EditUserPage'
import UserPage from './pages/UserPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddUserPage />} />
        <Route path='/edit/:id' element={<EditUserPage />} />
        <Route path='/user/:id' element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
