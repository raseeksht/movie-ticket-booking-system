import React, { useEffect, useState } from 'react'
import CustomNavbar from './CustomNavbar'
import {apiurl} from './apiurl'
import MovieCard from './MovieCard'

export default function Home() {
    const [movies,setMovies] = useState(null)
    useEffect(()=>{
        fetch(apiurl+"/movies").then(resp=>resp.json())
        .then(data=>setMovies(data.movies))
        .catch(err=>console.log(err))
    },[])

  return (
    <>
        <CustomNavbar /> 
        
        <div className="md:mx-20">
            <h1 className='text-4xl text-red-500 text-center mb-4'>Movie List</h1>
            <div className="grid gap-4 md:grid-cols-6 grid-cols-2">

            {movies && movies.map(movie=>(
                // <h1>{movie.name}</h1>
                <div className="mx-3 mb-6" key={movie._id}>
                    <MovieCard movie={movie} />
                </div>
            ))}
            </div>
        
        </div>   
    </>
  )
}
