import React,{useState} from 'react'

function GridGeneratorWithFormatter(props) {
  const [currentSeatPaint,setCurrentSeatPaint] = useState(null)


    const changeSeatFormatterMode = (mode)=>{

        setCurrentSeatPaint(mode)
    }

    const handleSeatClick = (e,rowIndex,colIndex)=>{
        // remove selection
        if (!currentSeatPaint){
          return
        }
        const newSeats = [...props.seats]
        newSeats[rowIndex][colIndex] = currentSeatPaint
        props.setSeats(newSeats)
        if (currentSeatPaint == "N"){
          e.target.classList.remove("bg-blue-500")
          e.target.classList.remove("bg-gray-500")
          e.target.classList.add("bg-red-500")
          
        }
        else if(currentSeatPaint == "U"){
          e.target.classList.remove("bg-blue-500")
          e.target.classList.remove("bg-red-500")
          e.target.classList.add("bg-gray-500")
        }else if(currentSeatPaint=="0"){
          e.target.classList.remove("bg-gray-500")
          e.target.classList.remove("bg-red-500")
          e.target.classList.add("bg-blue-500")
        }
      }
  return (
    <>
    <div className='addhall__gridContainer md:overflow-x-auto overflow-x-scroll dark:text-slate-100'>
        {
        props.seats && props.seats.map((row,rowIndex)=>(
                
        <div className='flex md:justify-center' key={rowIndex} value={rowIndex}>
        {row.map((col,colIndex)=>(
            <div
                key={colIndex}
                className={`${
                    col=="0"?"bg-blue-500":
                    col=="N"?"bg-red-500":
                    col=="U"?"bg-gray-500":""
                } h-7 w-7 m-1 text-center`}
                onClick={(e)=>handleSeatClick(e,rowIndex,colIndex)}
                >
                {String.fromCharCode(65 + rowIndex)}{colIndex}

            </div>

        ))}
        </div>
        ))
        
        }

        {
        props.seats ? 
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
        <div className=' w-7 h-7 bg-blue-500 text-center' onClick={()=>changeSeatFormatterMode("0")}></div>
        <div> &nbsp;Available</div>
    </div>
    {props.children}
    


    </div>
    
    :""
        }
    

    </div>
    </>
  )
}

export default GridGeneratorWithFormatter