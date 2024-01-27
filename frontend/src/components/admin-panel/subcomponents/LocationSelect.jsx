import React, { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'
import { Select } from 'flowbite-react'

function LocationSelect(props) {
    const authContext = useContext(AuthContext)
    const handleSelectChange = (e) => {
        props.handleSelectChange(e)
    }
  return (
    <>
    <Select className='md:w-1/3' onChange={(e)=>handleSelectChange(e)}>
        <option>Select Any location to edit</option>
        {authContext.existingBranchData ? 
            authContext.existingBranchData.map(elem=>(
                <option value={elem._id} key={elem._id}>{elem.location}</option>
            )) : ""
        }
    </Select>
    </>
  )
}

export default LocationSelect