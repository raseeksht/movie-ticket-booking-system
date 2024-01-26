import React, { useEffect, useState,useContext } from 'react'
import { TextInput,Label,Accordion,Select } from 'flowbite-react'
import { apiurl } from '../apiurl'
import AuthContext from '../../context/AuthContext'
import customFetch from '../authfetch'


function AddHall() {
  const authContext = useContext(AuthContext)
  const [grid,setGrid] = useState({})
  
  const [hallInfo,setHallInfo] = useState({})
  const [realGrid,setRealGrid] = useState(null)
  const [currentSeatPaint,setCurrentSeatPaint] = useState(null)

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

  const handleSeatClick = (e,rowIndex,colIndex)=>{
    // remove selection
    if (!currentSeatPaint){
      return
    }
    const newRealGrid = [...realGrid]
    newRealGrid[rowIndex][colIndex] = currentSeatPaint
    setRealGrid(newRealGrid)
    if (currentSeatPaint == "N"){
      e.target.classList.remove("bg-blue-500")
      e.target.classList.remove("bg-gray-500")
      e.target.classList.add("bg-red-500")
      
    }
    else if(currentSeatPaint == "U"){
      e.target.classList.remove("bg-blue-500")
      e.target.classList.remove("bg-red-500")
      e.target.classList.add("bg-gray-500")
    }else if(currentSeatPaint=="A"){
      e.target.classList.remove("bg-gray-500")
      e.target.classList.remove("bg-red-500")
      e.target.classList.add("bg-blue-500")
    }
  }

  const changeSeatFormatterMode = (mode)=>{
    setCurrentSeatPaint(mode)
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
                    <Select className='md:w-1/3' onChange={(e)=>handleSelectChange(e)}>
                      <option>Select Any location to edit</option>
                      {authContext.existingBranchData ? 
                          authContext.existingBranchData.map(elem=>(
                              <option value={elem._id} key={elem._id}>{elem.location}</option>
                          )) : ""
                      }
                  </Select>
                      
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

                      <div className='addhall__gridContainer md:overflow-x-auto overflow-x-scroll dark:text-slate-100'>
                          {
                            realGrid && realGrid.map((row,rowIndex)=>(
                                  
                            <div className='flex md:justify-center' key={rowIndex} value={rowIndex}>
                            {row.map((col,colIndex)=>(
                                <div
                                  key={colIndex}
                                  className='bg-blue-500 h-7 w-7 m-1 text-center'
                                  onClick={(e)=>handleSeatClick(e,rowIndex,colIndex)}
                                  >
                                  {String.fromCharCode(65 + rowIndex)}{colIndex}

                                </div>
    
                            ))}
                            </div>
                            ))
                            
                          }

                          {
                            realGrid ? 
                            <div className='addhall__formatpainter'>
                        <div className='flex'>
                          <div className=' w-7 h-7 bg-gray-500 text-center' onClick={()=>changeSeatFormatterMode("U")}></div>
                          <div> &nbsp;Unavailable</div>
                        </div>

                        <div className='flex'>
                          <div className=' w-7 h-7 bg-red-500 text-center' onClick={()=>changeSeatFormatterMode("N")}></div>
                          <div> &nbsp;No Seat</div>
                        </div>

                        <div className='flex'>
                          <div className=' w-7 h-7 bg-blue-500 text-center' onClick={()=>changeSeatFormatterMode("A")}></div>
                          <div> &nbsp;Available</div>
                        </div>
                      <button className='bg-green-500 px-5 py-1 my-3 rounded-sm' onClick={handleAddHall}>Add Hall</button>


                      </div>
                      
                      :""
                          }
                      

                      </div>
                      

                      

                    </div>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
        
        
    </div>
    </>
  )
}

export default AddHall