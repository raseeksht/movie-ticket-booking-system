import React, { useEffect, useState,useContext } from 'react'
import { TextInput,Label,Accordion,Select } from 'flowbite-react'
import { apiurl } from '../../apiurl'
import AuthContext from '../../../context/AuthContext'
import customFetch from '../../authfetch'
import EditHall from './EditHall'
import LocationSelect from '../subcomponents/LocationSelect'
import GridGeneratorWithFormatter from '../subcomponents/GridGeneratorWithFormatter'


function AddHall() {
  const authContext = useContext(AuthContext)
  const [grid,setGrid] = useState({})
  
  const [hallInfo,setHallInfo] = useState({})
  const [realGrid,setRealGrid] = useState(null)

  useEffect(() => {
    if (!authContext.existingBranchData){
      fetch(apiurl+"/branches")
      .then(resp=>resp.json())
      .then(data=>{
          authContext.setExistingBranchData(data.data)
      })
    }
  },[])


  const generateGrid = ()=>{
    const seatgrid = Array.from({length:grid.row},()=> new Array(Number(grid.col)).fill(0))
    console.log(seatgrid)
    setRealGrid(seatgrid)
  }

  const handleSelectChange = (e)=>{
    setHallInfo({...hallInfo,location_ref:e.target.value})
  }

  const handleAddHall = (e)=>{
    const payload = {...hallInfo,seatsArrangement:realGrid}
    console.log(payload)
    customFetch(apiurl+"/hall",payload)
    .then(data=>{
      authContext.setAlert({type:"success",message:data.message})
    })
    .catch(err=>{
      authContext.setAlert({type:"failure",message:String(err)})
      console.log(err)
    })
  }

  return (
    <>
    <div className='container dark:text-slate-300'>
        <h1 className='text-2xl font-bold mb-5'>Add/Edit Hall Information</h1>
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title>Add New Hall</Accordion.Title>
                <Accordion.Content>
                    <div>
                      <Label color="success" value='Branch Location' />
                    
                      <LocationSelect handleSelectChange={handleSelectChange} />
                      
                      <div className=' mb-3 md:w-1/3'>
                        <div className="mb-2 block">
                        <Label htmlFor="hallname" color="success" value="Hall Name" />
                        </div>
                        <TextInput placeholder='Audi 1,etc' id='hallname' required
                        value={hallInfo.name}
                        onChange={(e)=>setHallInfo({...hallInfo,name:e.target.value})}
                        />                        
                      </div>

                      <div className=' mb-3 md:w-1/3'>
                        <div className="mb-2 block">
                        <Label htmlFor="numrows" color="success" value="Number of Rows" />
                        </div>
                        <TextInput placeholder='10' id='numrows' type='Number' required
                        value={grid.row}
                        onChange={(e)=>setGrid({...grid,row:e.target.value})}
                        />                        
                      </div>

                      <div className=' mb-3 md:w-1/3'>
                        <div className="mb-2 block">
                        <Label htmlFor="numcols" color="success" value="Number of Cols" />
                        </div>
                        <TextInput placeholder='10' id='numcols' type='Number' required
                        value={grid.col}
                        onChange={(e)=>setGrid({...grid,col:e.target.value})}
                        />                        
                      </div>

                      <button className='bg-green-500 px-5 py-2 rounded-md' onClick={generateGrid}> Generate Grid</button>

                      <GridGeneratorWithFormatter seats={realGrid} setSeats={setRealGrid} >
                        <button className='bg-green-500 px-5 py-1 my-3 rounded-sm' onClick={handleAddHall}>Add Hall</button>
                        </GridGeneratorWithFormatter>
                      

                      

                    </div>
                </Accordion.Content>
            </Accordion.Panel>

            <Accordion.Panel>
              <Accordion.Title>
                Edit Hall Information
              </Accordion.Title>
              <Accordion.Content>
                <EditHall />
              </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
        
        
    </div>
    </>
  )
}

export default AddHall