import React, { useEffect ,useState} from 'react'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import MovieBookingPage from './components/movieBookingPage/MovieBookingPage'
import AuthContext from './context/AuthContext'
import Mytickets from './components/Mytickets'
import Dashboard from './components/admin-panel/Dashboard'
import CustomNavbar from './components/CustomNavbar'
import About from './components/About'
import Settings from './components/settings/Settings'

export default function App() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [alert,setAlert] = useState(null)
  const [isLoggedIn,setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")))
  const [userData,setUserData] = useState(JSON.parse(localStorage.getItem("data")) || {})
  const [existingBranchData,setExistingBranchData] = useState(null)
  const [navActive,setNavActive] = useState("home")

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
      anything,setAnything,
      existingBranchData,setExistingBranchData,
      navActive,setNavActive
      }}>
    <Router>
        <CustomNavbar />
      <Routes>
        <Route path="/movie/:movieId" Component={MovieBookingPage}></Route>
        <Route path="/" Component={Home}></Route>
        <Route path="/home" Component={Home}></Route>
        <Route path='/tickets' Component={Mytickets}></Route>
        <Route path='/admin-panel' Component={Dashboard}></Route>
        <Route path='/about' Component={About}></Route>
        <Route path='/settings' Component={Settings}></Route>



      </Routes>

    </Router>
    </AuthContext.Provider>
    </>
  )
}
