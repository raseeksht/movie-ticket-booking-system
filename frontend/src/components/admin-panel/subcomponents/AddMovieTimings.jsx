import React, { useState, useEffect, useContext } from 'react'
import { TextInput, Label, Datepicker, Select, Table, TableCell } from 'flowbite-react'
import { apiurl } from '../../apiurl'
import { dateParse, sha256 } from '../../utils'
import AuthContext from '../../../context/AuthContext'
import customFetch from '../../authfetch'

function AddMovieTimings() {
    const authContext = useContext(AuthContext)
    const [halls, setHalls] = useState(null)
    const [branch, setBranch] = useState(null)

    const [timingForm, setTimingForm] = useState({})
    const [table, setTable] = useState({})
    const [movies,setMovies] = useState({})

    useEffect(() => {
        fetch(apiurl + "/hall").then(resp => resp.json())
            .then(data => {
                setHalls(data.data)
                const location = {}
                const uniqueBranch = data.data.filter(hall => {
                    if (!location[hall.location_ref.location]) {
                        location[hall.location_ref.location] = true
                        return true
                    }
                    return false
                })
                setBranch(uniqueBranch)
            })
            .catch(err => console.log(err))
        fetch(apiurl+"/movies")
        .then(resp=>resp.json())
        .then(data=>setMovies(data.movies))
        .catch(err=>console.log(err))
    }, [])

    const handleAddToTable = async ()=>{
        // movie,branch,hall,date,time = 5
        if (Object.keys(timingForm).length !=  5 ){
            authContext.setAlert({type:"failure",message:"missing data"})
            return
        }
        
        // use hash of timingForm to prevent duplicate entry
        const hash = await sha256(JSON.stringify(timingForm))
        if (!table[hash]){
            setTable({...table,[hash]:timingForm})
        }else{
            authContext.setAlert({type:"failure",message:"duplicate entry not allowed"})
        }
    }

    const handleAddTiming = ()=>{
        const timings = Object.values(table)
        const movieId = timingForm.movieId
        customFetch(`${apiurl}/movietimings/${movieId}`,{timings},"POST")
        .then(data=>{
            authContext.setAlert({type:"success",message:data.message})
        })
        .catch(err=>{
            authContext.setAlert({type:"failure",message:String(err)})
        })
    }

    return (
        <>
            <h1 className='text-2xl dark:text-slate-200'>Add Movie timing</h1>
            <div className='grid md:grid-cols-3 gap-3'>
                <div>
                    <div className='mb-3'>
                        <div className="mb-2 block">
                            <Label htmlFor="showtime" color="success" value="Select Movie" />
                        </div>
                        <Select onChange={(e) => setTimingForm({ ...timingForm, movieId: e.target.value })}>
                            <option>Select Branch</option>
                            {movies && movies.map(movie => (
                                <option value={movie._id} key={movie.id}>{movie.name}</option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div>                    
                    <div className='mb-3'>
                        <div className="mb-2 block">
                            <Label htmlFor="showtime" color="success" value="Select Branch" />
                        </div>
                        <Select onChange={(e) => setTimingForm({ ...timingForm, branchId: e.target.value })}>
                            <option>Select Branch</option>
                            {branch && branch.map(br => (
                                <option value={br.location_ref._id} key={br.location_ref.id}>{br.location_ref.location}</option>
                            ))}
                        </Select>
                    </div>

                </div>

                <div>
                    <div className='mb-3'>
                        <div className="mb-2 block">
                            <Label htmlFor="showtime" color="success" value="Select Hall" />
                        </div>
                        <Select onChange={(e) => setTimingForm({ ...timingForm, hallId: e.target.value })} disabled={timingForm && timingForm.branchId ? false : true}>
                            <option>Select Hall</option>
                            {branch && timingForm && halls.filter(hall => hall.location_ref._id == timingForm.branchId).map(br => (
                                <option value={br._id} key={br._id}>{br.name}</option>
                            ))}
                        </Select>
                    </div>

                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="showtime" color="success" value="Date" />
                    </div>
                    <Datepicker onSelectedDateChanged={(date) => setTimingForm({ ...timingForm, "date": dateParse(date) })} />

                </div>
                <div>
                    <div className='mb-3'>
                        <div className="mb-2 block">
                            <Label htmlFor="showtime" color="success" value="Time" />
                        </div>
                        <TextInput placeholder='12:30 PM' id='showtime' required
                            value={timingForm.time}
                            onChange={(e) => setTimingForm({ ...timingForm, time: e.target.value })}
                        />
                    </div>

                </div>
            </div>
            <button className='bg-red-500 rounded-sm px-5 py-2 dark:text-white' onClick={handleAddToTable}>Add to Table</button>
            
            {Object.keys(table).length > 0 ? 
            <>
            <Table>
                <Table.Head>
                    <Table.HeadCell>branch</Table.HeadCell>
                    <Table.HeadCell>Audi</Table.HeadCell>
                    <Table.HeadCell>date</Table.HeadCell>
                    <Table.HeadCell>Time</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y'>
                    {/* {console.log(table)} */}
                    {Object.keys(table).map(hash => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {branch.filter(br=>table[hash].branchId==br.location_ref._id)[0].location_ref.location}
                                
                            </Table.Cell>
                            <Table.Cell>{halls.filter(hallelem=>hallelem._id==table[hash].hallId)[0].name}</Table.Cell>
                            <Table.Cell>{table[hash].date}</Table.Cell>
                            <Table.Cell>{table[hash].time}</Table.Cell>

                        </Table.Row>

                    ))

                    }

                </Table.Body>
            </Table>
            <button className='px-5 py-2 bg-red-500 dark:text-white' onClick={handleAddTiming}> Add All Timings</button>
            </>
            :""}
        </>
    )
}

export default AddMovieTimings