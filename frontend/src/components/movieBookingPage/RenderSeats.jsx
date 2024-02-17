import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/AuthContext'

function RenderSeats(props) {
    const authContext = useContext(AuthContext)
    const [btnDisabled,setBtnDisabled] = useState(true)
    // const [price,setPrice] = useState(0)

    useEffect(() => {
        if (props.price > 0){
            setBtnDisabled(false)
        }else if (props.price == 0){
            setBtnDisabled(true)
        }
    }, [props.price])

    const handleSeatClick = (e, [x, y], seatStatus) => {
        if (seatStatus == 0 || seatStatus == 2) {
            // remove selection
            if (e.target.classList.toggle("bg-blue-500")) {
                props.setPrice(props.price - 250)
                setMySeats(mySeats.filter(elem => elem != `${x}-${y}`))

            }
            // add selection
            if (e.target.classList.toggle("bg-green-500")) {
                props.setPrice(props.price + 250)
                setMySeats([...mySeats, `${x}-${y}`])


            }
        }
    }

    const handleProceedToPayment = async () =>{
        if (!localStorage.getItem("token")){
            return authContext.setOpenLoginModal(true)
        }
        authContext.setOpenPaymentModal(true)
    }

    return (
        <>
            <h1>oo{props.seatsArrangement && props.seatsArrangement.length}</h1>
            <div className='text-center mt-10 border-2 border-solid'>Screen Side</div>
            <div className='seats mt-5'>
                {props.seatsArrangement && props.seatsArrangement.map((row, rowIndex) => (

                    <div className='flex justify-center' key={rowIndex} value={rowIndex}>
                        {row.map((col, colIndex) => (
                            <div
                                key={colIndex}
                                className={`${col == "0" ? "bg-blue-500" :
                                    col == "N" ? "" :
                                        col == "U" ? "bg-gray-500" : ""
                                    } h-7 w-7 m-1 text-center`}
                                onClick={(e) => handleSeatClick(e, [rowIndex, colIndex], col)}
                            >
                                {
                                col=="N"? "" : String.fromCharCode(65 + rowIndex)+colIndex
                                }
                            </div>

                        ))}
                    </div>
                ))}
                <div>
                    <div className='my-3 text-sm'>
                        <div className='inline-block bg-red-500 h-[22px] w-[22px] m-1 text-center text-red-500'> </div> No seats
                        <div className='inline-block bg-blue-500 h-[22px] w-[22px] m-1 text-center text-blue-500'> </div> Available
                        <div className='inline-block bg-green-500 h-[22px] w-[22px] m-1 text-center text-green-500'> </div> Selected Seats

                    </div>

                    Total Price: {props.price}
                </div>
                <button onClick={handleProceedToPayment} className={`${btnDisabled ? 'bg-gray-500' : 'bg-red-500'} rounded px-2 py-1`} disabled={btnDisabled} id="proceedToPaymentBtn">Proceed to Payment</button>


            </div>
        </>
    )
}

export default RenderSeats