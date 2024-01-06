import React,{useContext} from 'react'
import { Modal } from 'flowbite-react'
import AuthContext from '../context/AuthContext'

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
    // console.log("posting to esewa")
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
            su: `http://192.168.1.65:5173/movie/${props.movie._id}?s=1&seats=${JSON.stringify(props.mySeats)}`,
            fu: `http://192.168.1.65:5173/movie/${props.movie._id}?s=0`
        }
        // alert("params.amt")
        console.log(params)
        postesewa(path,params)



    }

  return (
    <>
    {/* <button onClick={authContext.setOpenPaymentModal(true)}>open payment</button> */}
        <Modal show={authContext.openPaymentModal} position={"center"} onClose={()=>authContext.setOpenPaymentModal(false)}>
            <Modal.Header>Payment</Modal.Header>
            <Modal.Body className='dark:text-white'>
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
                            cash payment at counter

                        </div>

                    </div>

                </div>
                
            



            </Modal.Body>
        </Modal>
    </>
  )
}

export default PaymentModal