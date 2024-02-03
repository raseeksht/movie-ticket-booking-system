import React, { useContext, useEffect } from 'react'
import AuthContext from '../../../context/AuthContext'
import { Select } from 'flowbite-react'
import { apiurl } from '../../apiurl'

function LocationSelect(props) {
    const authContext = useContext(AuthContext)
    const handleSelectChange = (e) => {
        props.handleSelectChange(e)
    }
    useEffect(()=>{
        if (!authContext.existingBranchData){
            fetch(apiurl+"/branches")
            .then(resp=>resp.json())
            .then(data=>{
                authContext.setExistingBranchData(data.data)
            })
        }
    })
  return (
    <>
    <Select className='' onChange={(e)=>handleSelectChange(e)}>
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