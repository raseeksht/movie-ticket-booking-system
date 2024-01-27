import React, { useState, useContext } from 'react'
import { TextInput, Label, Datepicker, Textarea } from 'flowbite-react'
import customFetch from '../authfetch'
import { apiurl } from '../apiurl'
import AuthContext from '../../context/AuthContext'

function AddNewMovie() {
  const [movieData, setMovieData] = useState({})
  const authContext = useContext(AuthContext)

  const handleAddMovie = (e) => {
    e.preventDefault()
    const form = document.getElementById("addmovie_form")
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    customFetch(apiurl + "/movies", movieData)
      .then(data => {
        if (data.status == "ok") {
          authContext.setAlert({ type: "success", message: data.message })
        } else {
          authContext.setAlert({ type: "failed", message: data.message })

        }
      })
      .catch(err => {
        authContext.setAlert({ type: "warning", "message": String(err) })
      })
    console.log(movieData)
  }

  const handleDateChange = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const format_date = `${year}/${month}/${day}`
    setMovieData({ ...movieData, releaseDate: format_date })
  }

  return (
    <>
      <form id='addmovie_form md:px-8'>
        <div className='md:grid md:grid-cols-3 gap-3'>
          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="moviename" color="success" value="Movie Name" />
            </div>
            <TextInput placeholder='Endgame' id='moviename' required
              value={movieData.name}
              onChange={(e) => setMovieData({ ...movieData, name: e.target.value })}
            />
          </div>

          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="movie_thumbnail" color="success" value="Thumbnail Url" />
            </div>
            <TextInput placeholder='https://xyz.com/img.png' id='movie_thumbnail' required
              value={movieData.thumbnail}
              onChange={(e) => setMovieData({ ...movieData, thumbnail: e.target.value })}
            />
          </div>

          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="releasedate" color="success" value="Release Date" />
            </div>
            <Datepicker onSelectedDateChanged={(date) => handleDateChange(date)} required />
          </div>
        </div>

        <div className='md:mr-3 mb-3 w-full'>
          <div className="mb-2 block">
            <Label htmlFor="description" color="success" value="Description" />
          </div>
          <Textarea id='description' placeholder='Description of movie' required
            value={movieData.description}
            onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
          />
        </div>

        <div className='md:grid md:grid-cols-3 gap-3'>
          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="length" color="success" value="Movie length (in minutes)" />
            </div>
            <TextInput placeholder='120' id='length' required
              type='number'
              value={movieData.length}
              onChange={(e) => setMovieData({ ...movieData, length: e.target.value })}
            />
          </div>

          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="rating" color="success" value="Movie Rating (PG-13, R)" />
            </div>
            <TextInput placeholder='R' id='rating' required
              value={movieData.rating}
              onChange={(e) => setMovieData({ ...movieData, rating: e.target.value })}
            />
          </div>

          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="trailer" color="success" value="Movie Trailer (YT Url)" />
            </div>
            <TextInput placeholder='https://youtu.be/TcMBFSGVi1c' id='trailer' required
              value={movieData.trailer}
              onChange={(e) => setMovieData({ ...movieData, trailer: e.target.value })}
            />
          </div>

          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="showtime" color="success" value="Movie Showtime" />
            </div>
            <TextInput placeholder='12:30 PM' id='showtime' required
              value={movieData.showTime}
              onChange={(e) => setMovieData({ ...movieData, showTime: e.target.value })}
            />
          </div>

        </div>

        <button onClick={(e) => handleAddMovie(e)} className='bg-green-600 px-8 py-2 rounded-lg mb-4'>
          Add
        </button>
      </form>

      <hr className='mb-5' />

      <div className='grid md:grid-cols-3 gap-3'>
        <div>
          <Datepicker />

        </div>
        <div>
          <Datepicker />

        </div>
      </div>
    </>
  )
}

export default AddNewMovie