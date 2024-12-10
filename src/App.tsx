import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginSignup from './LoginSignup/LoginSignup'
import Dashboard from './Dashboard/Dashboard'
import Routine from './Routine/Routine'
import TeacherRoutineSearch from './TeacherRoutineSearch/TeacherRoutineSearch'
import NotImplemented from './NotImplemented/NotImplemented'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/routine" element={<Routine />} />
      <Route path="/teacher-routine-search" element={<TeacherRoutineSearch></TeacherRoutineSearch>} />
      <Route path="/not-implemented" element={<NotImplemented></NotImplemented>} />
    </Routes>
  )
}

export default App
