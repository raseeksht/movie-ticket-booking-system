import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import MovieContex from '../../context/movieContext'

function RenderSeats(props) {
    const authContext = useContext(AuthContext);
    const movieContext = useContext(MovieContex);
    const [btnDisabled,setBtnDisabled] = useState(true);
    // const [seatsStatus,setSeatsStatus] = useState(null);

    // useEffect(()=>{
    //     alert("seatsarrangement changed")
    //     setSeatsStatus(movieContext.seatsArrangement)
    // },[movieContext.seatsArrangement])

    useEffect(() => {
        if (movieContext.price > 0){
            setBtnDisabled(false)
        }else if (movieContext.price == 0){
            setBtnDisabled(true)
        }
    }, [movieContext.price])

    const handleSeatClick = (e, [x, y], seatStatus) => {
        if (seatStatus == 0 || seatStatus == 1) {
            // remove selection
            if (e.target.classList.toggle("bg-blue-500")) {
                movieContext.setPrice(movieContext.price - 250)
                movieContext.setMySeats(movieContext.mySeats.filter(elem => elem != `${x}-${y}`))

            }
            // add selection
            if (e.target.classList.toggle("bg-green-500")) {
                movieContext.setPrice(movieContext.price + 250)
                movieContext.setMySeats([...movieContext.mySeats, `${x}-${y}`])


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
            <div className='text-center mt-10 border-2 border-solid'>Screen Side</div>
            <div className='seats mt-5'>
                {movieContext.seatsArrangement && movieContext.seatsArrangement.map((row, rowIndex) => (

                    <div className='flex justify-center' key={rowIndex} value={rowIndex}>
                        {row.map((col, colIndex) => (
                            <div
                                key={colIndex}
                                className={`${col == "0" ? "bg-blue-500" :
                                    col == "N" ? "" :
                                        col == "U" ? "bg-gray-500" : 
                                        col == '1' ? "bg-red-500" :""
                                    } h-7 w-7 m-1 text-center`}
                                onClick={(e) => handleSeatClick(e, [rowIndex, colIndex], col)}
                            >
                                {/* show nothing if seat is marked "N"(no seat) else show A1,A2,etc */}
                                {
                                col=="N"? "" : String.fromCharCode(65 + rowIndex)+colIndex
                                }
                            </div>

                        ))}
                    </div>
                ))}
                <div>
                    <div className='my-3 text-sm'>
                        <div className='inline-block bg-red-500 h-[22px] w-[22px] m-1 text-center text-red-500'> </div> Booked
                        <div className='inline-block bg-blue-500 h-[22px] w-[22px] m-1 text-center text-blue-500'> </div> Available
                        <div className='inline-block bg-green-500 h-[22px] w-[22px] m-1 text-center text-green-500'> </div> Selected Seats
                        <div className='inline-block bg-gray-500 h-[22px] w-[22px] m-1 text-center text-green-500'> </div> Unavailable

                    </div>

                    Total Price: {movieContext.price}
                </div>
                <button onClick={handleProceedToPayment} className={`${btnDisabled ? 'bg-gray-500' : 'bg-red-500'} rounded px-2 py-1`} disabled={btnDisabled} id="proceedToPaymentBtn">Proceed to Payment</button>


            </div>
        </>
    )
}

export default RenderSeats