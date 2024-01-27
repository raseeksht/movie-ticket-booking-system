import React, { useContext, useEffect, useState } from 'react'
import { Select,Label,TextInput } from 'flowbite-react'
import { apiurl } from '../../apiurl'
import GridGeneratorWithFormatter from '../subcomponents/GridGeneratorWithFormatter'
import customFetch from '../../authfetch'
import AuthContext from '../../../context/AuthContext'

function EditHall() {
    const authContext = useContext(AuthContext)
    const [availableHalls,setAvailableHalls] = useState(null)
    const [availableHallFromLocation,setAvailableHallFromLocation] = useState(null)

    // after chooosing location and hall name, seatsArrangement will reside here and rendered
    const [finalChoosenHallArrangement,setFinalChoosenHallArrangement] = useState(null)

    const [selectedHall,setSelectedHall] = useState(null)

    const [uniqueBranch,setUniqueBranch] = useState(null)

    const [refresh,setRefresh] = useState(null)

    const [editPayload,setEditPayload] = useState({})

    const handleSelectChange = (e) => {
        // props.handleSelectChange(e)
        const location_ref = e.target.value
        const newlist = availableHalls.filter(hall=>hall.location_ref._id == e.target.value)
        // console.log(newlist)
        setAvailableHallFromLocation(newlist)
        setEditPayload({...editPayload,location_ref})
    }

    const handleParticularHallSelectChange = (e) =>{
        const filteredHall = availableHallFromLocation.filter(hall=>hall.name==e.target.value)
        // filteredHall[0] contains selectedHall information
        setSelectedHall(filteredHall[0])
        setFinalChoosenHallArrangement(filteredHall[0].seats)
        setEditPayload({...editPayload,name:e.target.value})
    }

    const handleEdit = () =>{
        const payload = {
            name:editPayload.name,
            seats:selectedHall.seats
        }
        customFetch(`${apiurl}/hall/${selectedHall._id}`,payload,{},"PUT")
        .then(data=>{
            authContext.setAlert({type:"success",message:data.message})
            setRefresh(Math.random())
        })
        .catch(err=>{
            authContext.setAlert({type:"failure",message:String(err)})
        })
    }
    const handleDelete = ()=>{
        fetch(`${apiurl}/hall/${selectedHall._id}`,{
            method:"DELETE",
        }).then(res=>res.json())
        .then(data=>{
            authContext.setAlert({type:"success",message:data.message})
            setRefresh(Math.random())
        })
        .catch(err=>{
            authContext.setAlert({type:"failure",message:String(err)})
        })

    }

    useEffect(()=>{
        fetch(apiurl+"/hall").then(res=>res.json())
        .then(data=>{
            // data.data contains list of halls, one location can contain multiple halls
            const location = {}
            const uniqueBranch1 = data.data.filter(hall=>{
                if (!location[hall.location_ref.location]){
                    location[hall.location_ref.location] = true
                    return true
                }
                return false
            })
            setUniqueBranch(uniqueBranch1)
            setAvailableHalls(data.data)

            // reset on successfully edit
            setAvailableHallFromLocation(null)
            setFinalChoosenHallArrangement(null)
            document.getElementById("test").selectedIndex=0
        })
        .catch(err=>console.log(err))
    },[refresh])

  return (
    <>
    <div className=''>
        <Label color="success" value='Location' />
        <Select className='md:w-1/3' onChange={(e)=>handleSelectChange(e)} id='test'>
            <option value="a" selected>Select Any location to edit</option>
            {uniqueBranch ? 
                uniqueBranch.map(elem=>{
                    return <option value={elem.location_ref._id} key={elem._id}>{elem.location_ref.location}</option>
                }) : ""
            }
        </Select>
    </div>
    <div>
        <Label color="success" value='Hall Name' />
        <Select className='md:w-1/3' onChange={(e)=>handleParticularHallSelectChange(e)} disabled={Boolean(!availableHallFromLocation)}>
            <option>Select Any Hall Name to edit</option>
            {availableHallFromLocation ? 
                availableHallFromLocation.map(elem=>(
                    <option value={elem.name} key={elem._id}>{elem.name}</option>
                )) : ""
            }
        </Select>
    </div>
    {finalChoosenHallArrangement &&
        <div className=' mb-3 md:w-1/3'>
            <div className="mb-2 block">
            <Label htmlFor="hallname" color="success" value="Hall Name" />
            </div>
            <TextInput placeholder='Audi 1,etc' id='hallname' required
            value={editPayload.name}
            onChange={(e)=>setEditPayload({...editPayload,name:e.target.value})}
            />                        
        </div>

    }
    <GridGeneratorWithFormatter seats={finalChoosenHallArrangement} setSeats={setFinalChoosenHallArrangement}>
        <button className='bg-green-500 px-5 py-1 my-3 rounded-sm' onClick={handleEdit}> Edit </button>
        <button className='bg-red-500 px-5 py-1 m-3 rounded-sm' onClick={handleDelete}> Delete </button>
    </GridGeneratorWithFormatter>
    
    </>
  )
}

export default EditHall