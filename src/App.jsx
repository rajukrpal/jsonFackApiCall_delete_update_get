import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './componets/Home'
import User from './componets/User'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/user' element={<User />} /> 
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

// https://jsonplaceholder.typicode.com/posts
