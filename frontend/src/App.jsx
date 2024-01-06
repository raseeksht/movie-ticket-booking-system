import React, { useEffect ,useState} from 'react'

// import CustomNav from './components/CustomNavbar'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import MovieBookingPage from './components/MovieBookingPage'
import AuthContext from './context/AuthContext'

export default function App() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")))


  return (
    <>
    <AuthContext.Provider value={{
      openLoginModal,
      setOpenLoginModal,
      isLoggedIn,
      setIsLoggedIn,
      openPaymentModal,setOpenPaymentModal
      }}>
    <Router>
      <Routes>
        <Route path="/movie/:movieId" Component={MovieBookingPage}></Route>
        <Route path="/" Component={Home}></Route>
        <Route path="/home" Component={Home}></Route>


      </Routes>

    </Router>
    </AuthContext.Provider>
    </>
  )
}
