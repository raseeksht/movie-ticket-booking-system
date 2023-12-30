import React, { useEffect, useState } from 'react'
import { apiurl } from './apiurl'
import { useParams } from 'react-router-dom'
import CustomNavbar from './CustomNavbar'

export default function MovieBookingPage() {
    const movieId = useParams().movieId
    const [movie,setMovie] = useState(null)
    useEffect(()=>{
        fetch(`${apiurl}/movies/${movieId}`)
        .then(data=>data.json())
        .then(data=>setMovie(data.movie))
        .catch(err=>console.log(err))
    },[])
  return (
    <>
        <CustomNavbar />
        {movie == null? <h1>Loading</h1>:
            <div className="container">
                <h1 className='text-bold text-2xl dark:text-white'>{movie.name}</h1>
            </div>
        
        }
        
    </>
  )
}
