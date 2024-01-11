import React,{useContext, useState} from 'react'
import QRCode from 'react-qr-code'
import AuthContext from '../context/AuthContext'
import html2pdf from 'html2pdf.js'
import { useEffect } from 'react'

function TicketTemplate(props) {
    const [seats,setSeats] = useState(null)
    const authContext = useContext(AuthContext)

    useEffect(()=>{
        if (authContext.anything.seatsPdf){
            const seats1 = authContext.anything.seatsPdf.map(seat=>{
                let col = parseInt(seat.split("-")[1])
                let seatId = String.fromCharCode(65 + parseInt(seat.split("-")[0])) + col
                return seatId
            })
            console.log(seats1)
            setSeats(seats1)

        }
    },[authContext.anything.seatsPdf])

    const download = () =>{
        const options = {
            margin: 2,
            filename: 'output.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'mm', format: [90, 150], orientation: 'portrait' }
        };
        const div = document.getElementById("container")
        html2pdf(div,options)
    }
  return (
    <>
    <div className='text-white hidden'>
        <div className="container p-5 w-[300px]" id="container">
            <h1 className="text-2xl">{authContext.anything.moviePdf}</h1>
            <div className="flex place-content-between">
                <div>
                    <span className="mdi mdi-calendar-range"> 2020/23/21</span>
                </div>
                <div>
                    <span className="mdi mdi-clock-time-eight"></span> 1:30
                </div>
            </div>
            <div className="">
                <span className="mdi mdi-map"></span> Location

            </div>
            <hr className="my-5" />
            
            <div className="flex text-center place-content-around">
                <div className="border-r-2 border-solid border-[red] w-[33.3%]">
                    <div>Ticket</div>
                    <div>{seats && seats.length}</div>
                </div>
                <div className="border-r-2 border-solid border-[red] w-[33.3%]">
                    <div>Audi</div>
                    <div>1</div>
                </div>
                <div className="w-[33.3%]">
                    <div>seats</div>
                    <div>{seats &&
                        seats.join(", ")
                    }</div>
                </div>
                
            </div>

            <div id="qrcode" className="flex place-content-center mt-5">
                <QRCode value={JSON.stringify({movie:authContext.anything.moviePdf,seats:seats})}></QRCode>
            </div>

        </div>
    </div>
    <button onClick={download} className={`bg-red-500 mx-2 p-1 px-5 rounded ${props.downloadBtnHidden? 'hidden' :''}`}>download ticket</button>
    </>
  )
}

export default TicketTemplate