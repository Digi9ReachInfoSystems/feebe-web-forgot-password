import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ForgotPassword from './ForgotPassword/ForgotPassword'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/secure-link" element={<ForgotPassword/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
