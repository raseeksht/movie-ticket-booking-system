import React,{useContext} from 'react'
import { Modal } from 'flowbite-react'
import AuthContext from '../../context/AuthContext'
import MovieContex from '../../context/movieContext'
import customFetch from "../authfetch"
import {apiurl,frontEndUrl} from "../apiurl"
import handleDownloadTicket from '../TicketTemplate'
import { getAudiId } from '../utils'



function postesewa(path, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}

function PaymentModal(props) {
    const authContext = useContext(AuthContext)
    const movieContex = useContext(MovieContex)
    // console.log(authContext.openPaymentModal)
    const handleEsewa = () =>{
        // audiId,date,time will be used to book ticket after successful payment
        const audiId = getAudiId(movieContex.ticketDetails,movieContex.movie.movieTimings)
        const date = movieContex.ticketDetails.date
        const time = movieContex.ticketDetails.time
        var path="https://uat.esewa.com.np/epay/main";
        var params= {
            amt: props.price,
            psc: 0,
            pdc: 0,
            txAmt: 0,
            tAmt: movieContex.price,
            pid: movieContex.movie._id + "-" + new Date().getTime(),
            scd: "EPAYTEST",
            su: `${frontEndUrl}/movie/${movieContex.movie._id}?s=1&seats=${JSON.stringify(movieContex.mySeats)}&audiId=${audiId}&date=${date}&time=${time}`,
            fu: `${frontEndUrl}/movie/${movieContex.movie._id}?s=0`
        }
        postesewa(path,params)
    }

    const handleCashPayment = () => {
        const audiId = getAudiId(movieContex.ticketDetails,movieContex.movie.movieTimings)
        const payload = {
            bookedSeats:movieContex.mySeats,
            audiId,
            date:movieContex.ticketDetails.date,
            time:movieContex.ticketDetails.time
        }
        console.log("payload",payload)
        customFetch(
            apiurl+"/movies/bookseatphysical/"+movieContex.movie._id,
            payload
        ).then(data=>{
            const movie = movieContex.movie
            authContext.setAlert({type:"success",message:data.message})
            authContext.setOpenPaymentModal(false)
            authContext.setAnything({...authContext.anything,seatsPdf:movieContex.mySeats})
            movieContex.setPrice(0)
            movieContex.setMySeats([])
            movieContex.setPayment(Math.random())
            movieContex.setSeatsArrangement(data.result.seats_status)
            console.log("response data after booking = ",data)
            console.log("updated seat information",data.result.seats_status)
            setTimeout(()=>{
                handleDownloadTicket({
                    movie:data.result.movie_ref.name,
                    date:data.result.movie_ref.releaseDate,
                    time:data.result.time,
                    location:data.result.audi_ref.location_ref.location,
                    seats:data.bookedSeats,
                    audi:data.result.audi_ref.name
                })
            },2000)
            
        }).catch(err=>{
            authContext.setAlert({type:"failure",message:String(err)})
        })
    }

  return (
    <>
    {/* <button onClick={authContext.setOpenPaymentModal(true)}>open payment</button> */}
        <Modal show={authContext.openPaymentModal} position={"center"} onClose={()=>authContext.setOpenPaymentModal(false)}>
            <Modal.Header>Payment | Rs. {props.price}</Modal.Header>
            <Modal.Body className='dark:text-white'>
                <div className='text-xs'>
                    Note: use testing account for payment:<br />
                    id: 9806800001<br />
                    pw= Nepal@123<br />
                    token=123456<br />
                </div>
                <div className=''>
                    <div className='flex justify-center'>
                        <button onClick={handleEsewa} className='bg-green-400 flex justify-center items-center p-2 rounded-lg'>
                            <img src='https://uat.esewa.com.np/common/images/esewa-icon-large.png' height="30px" width='30px' />
                            Pay with esewa                    
                        </button>
                    </div>
                    <div className='flex-row '>
                        <div className='flex justify-evenly'>
                            ----------------or----------------

                        </div>
                        <div className='flex justify-center'>
                        <button onClick={handleCashPayment} className='bg-red-400 flex justify-center items-center p-2 rounded-lg'>
                            Cash Payment                    
                        </button>

                        </div>

                    </div>

                </div>
                
            



            </Modal.Body>
        </Modal>
    </>
  )
}

export default PaymentModal