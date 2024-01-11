import React, { useEffect ,useState} from 'react'
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
  const [alert,setAlert] = useState(null)
  const [isLoggedIn,setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")))
  const [userData,setUserData] = useState(JSON.parse(localStorage.getItem("data")) || null)
  const [anything,setAnything] = useState({})


  return (
    <>
    <AuthContext.Provider value={{
      openLoginModal,
      setOpenLoginModal,
      isLoggedIn,
      setIsLoggedIn,
      openPaymentModal,setOpenPaymentModal,
      alert,setAlert,
      userData,setUserData,
      anything,setAnything
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
