import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginSignup from './LoginSignup/LoginSignup'
import Dashboard from './Dashboard/Dashboard'
import Routine from './Routine/Routine'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/routine" element={<Routine />} />
    </Routes>
  )
}

export default App
