import React, { useEffect,useContext, useState } from 'react'
import {useNavigate, useSearchParams} from "react-router-dom"
import AddNewMovie from './AddNewMovie'
import SideNav from './SideNav'
import NavContext from '../../context/NavContext'
import AddBranch from './AddBranch'
import AddHall from './hall/AddHall'
import AddMovieTimings from './AddMovieTimings'

function Dashboard() {
  const navigate = useNavigate()
  const [currentSection,setCurrentSection] = useState("addmovie")
  useEffect(() => {
    try{
      const data = JSON.parse(localStorage.getItem("data"))
      if (!data || data.usertype !== "admin"){
        navigate("/")
      }
    } catch(err){
      console.log(err)
    }
  }, [])
  return (
    <>
    <div className="container md:mx-auto md:px-4 dark:text-gray-400">

    <NavContext.Provider value={{currentSection,setCurrentSection}}>
  <div className="md:px-8 px-4 mt-3 rounded-md shadow-md">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

    <div className='md:flex'>
      <div className='md:w-1/6'>
        <SideNav />
      </div>
      <hr className="my-5 border-slate-500" />
      <div className='md:w-5/6'>
        {currentSection == "addmovie" ? <AddNewMovie /> :""}
        {currentSection == "addbranch" ? <AddBranch /> :""}
        {currentSection == "addhall" ? <AddHall /> :""}
        {currentSection == "addtimings" ? <AddMovieTimings /> :""}
      </div>
      
    </div>

  </div>
  </NavContext.Provider>

</div>

    </>
  )
}

export default Dashboard