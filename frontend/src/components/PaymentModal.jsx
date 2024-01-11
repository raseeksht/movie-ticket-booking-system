import React,{useContext} from 'react'
import { Modal } from 'flowbite-react'
import AuthContext from '../context/AuthContext'
import customFetch from "./authfetch"
import {apiurl,frontEndUrl} from "./apiurl"

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
    console.log(authContext.openPaymentModal)
    const handleEsewa = () =>{
        var path="https://uat.esewa.com.np/epay/main";
        var params= {
            amt: props.price,
            psc: 0,
            pdc: 0,
            txAmt: 0,
            tAmt: props.price,
            pid: props.movie._id + "-" + new Date().getTime(),
            scd: "EPAYTEST",
            su: `${frontEndUrl}/movie/${props.movie._id}?s=1&seats=${JSON.stringify(props.mySeats)}`,
            fu: `${frontEndUrl}/movie/${props.movie._id}?s=0`
        }
        postesewa(path,params)
    }
    const handleCashPayment = () => {
        customFetch(
            apiurl+"/movies/bookseatphysical/"+props.movie._id,
            {
                bookedSeats:props.mySeats
            }
        ).then(data=>{
            authContext.setAlert({type:"success",message:data.message})
            authContext.setOpenPaymentModal(false)
            authContext.setAnything({...authContext.anything,seatsPdf:props.mySeats})
            props.setPrice(0)
            props.setMySeats([])
            props.setPayment(Math.random())
            props.setDownloadBtnHidden(0) //0->hides download ticket btn

            
        }).catch(err=>{
            authContext.setAlert({type:"error",message:err})
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