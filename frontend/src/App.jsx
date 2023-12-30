import React, { useEffect } from 'react'
// import CustomNav from './components/CustomNavbar'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import MovieBookingPage from './components/MovieBookingPage'

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/movie/:movieId" Component={MovieBookingPage}></Route>
        <Route path="/" Component={Home}></Route>
        <Route path="/home" Component={Home}></Route>


      </Routes>

    </Router>
    </>
  )
}
