import React, { useState,useContext, useEffect } from 'react'
import { TextInput,Label,Select } from 'flowbite-react'
import { apiurl } from '../apiurl'
import customFetch from '../authfetch'
import AuthContext from '../../context/AuthContext'
import LocationSelect from './subcomponents/LocationSelect'

function AddBranch() {
    const authContext = useContext(AuthContext)
    const [branchData,setBranchData] = useState({})
    // const [existingBranchData,setExistingBranchData] = useState(null)
    const [btnState,setBtnState] = useState({add:true,edit:false})
    const [refresh,setRefresh] = useState(null)

    useEffect(() => {
        // no need to fetch if existingBranchData is already loaded
        if (!authContext.existingBranchData){
            fetch(apiurl+"/branches")
            .then(resp=>resp.json())
            .then(data=>{
                authContext.setExistingBranchData(data.data)
            })
        }
    }, [refresh])

    const handleAddBranch = (e,action="post")=>{
        // action= "post" or "put"
        e.preventDefault()
        const form = document.getElementById("addBranchForm")
        if (!form.checkValidity()){
            return form.reportValidity()
        }
        // editBranchId is present only when branch value is edited else it is undefined or null
        const payload = {...branchData,_id:btnState.editBranchId}
        customFetch(apiurl+"/branches",payload,{},action)
        .then(data=>{
            authContext.setAlert({type:"success",message:data.message})
            // when exisingbranchdata is null and change in refresh will trigger branch refresh
            authContext.setExistingBranchData(null)
            setRefresh(Math.random())
        })
        .catch(err=>{
            authContext.setAlert({type:"failure",message:String(err)})
            console.log("error:",err)
        })
    }

    const handleSelectChange = (e)=>{
        const a = authContext.existingBranchData.filter(elem=>elem._id == e.target.value)
        setBranchData({location:a[0].location,contact:a[0].contact})
        // makes add button disabled and edit btn clickable
        // editBranchId will contain the current _id of branch to be edited
        // later accessed from handleAddBranch() if req method=put
        setBtnState({add:false,edit:true,editBranchId:a[0]._id})
    }

    const handleEditBranch =(e)=>{
        handleAddBranch(e,"put")
    }

  return (
    <>
    <div className='branchContainer md:px-8 w-[100%]'>
        <h1 className='text-2xl dark:text-slate-300 font-bold mb-5'>Add New / Edit Branch</h1>
        <form id='addBranchForm'>
            <LocationSelect handleSelectChange={handleSelectChange} />
            <div className='md:flex'>

            
            <div className='mb-3 md:w-1/3 md:mr-5'>
                <div className="mb-2 block">
                <Label htmlFor="location" color="success" value="Branch Location" />
                </div>
                <TextInput placeholder='ktm' id='location' required
                value={branchData.location}
                onChange={(e)=>setBranchData({...branchData,location:e.target.value})}
                />
            </div>
            <div className=' mb-3 md:w-1/3'>
                <div className="mb-2 block">
                <Label htmlFor="contact" color="success" value="Branch Contact Number" />
                </div>
                <TextInput placeholder='9865XXXXX' id='contact' type='Number' required
                value={branchData.contact}
                onChange={(e)=>setBranchData({...branchData,contact:e.target.value})}
                />
            </div>

            
            </div>
            <div>
                <button onClick={(e)=>handleAddBranch(e)} className={`${btnState.add?"bg-green-600":"bg-gray-400"} px-8 py-2 rounded-lg mb-4 text-slate-300 mr-5`} disabled={!btnState.add}>
                    Add Branch
                </button>
                <button onClick={(e)=>handleEditBranch(e)} className={`${btnState.edit?"bg-blue-600":"bg-gray-400"} px-8 py-2 rounded-lg mb-4 text-slate-300`} disabled={!btnState.edit}>
                    Edit Branch
                </button>
            </div>
            

        </form>
    </div>
    
    
    </>
  )
}

export default AddBranch