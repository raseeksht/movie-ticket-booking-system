import React, { useEffect, useState } from 'react'
import {apiurl} from './apiurl'
import MovieCard from './MovieCard'

export default function Home() {
    const [movies,setMovies] = useState(null)
    const key = import.meta.env.VITE_API_KEY
    
    useEffect(()=>{
        fetch(apiurl+"/movies").then(resp=>resp.json())
        .then(data=>setMovies(data.movies))
        .catch(err=>console.log(err))
    },[])

  return (
    <>
        <h1>hello{key}</h1>
        
        <div className="md:mx-20">
            <h1 className='text-4xl text-red-500 text-center mb-4'>Movie List</h1>
            <div className="grid md:grid-cols-6 grid-cols-3">

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
