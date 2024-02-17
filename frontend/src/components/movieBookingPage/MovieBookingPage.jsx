import React, { useEffect, useState,useContext } from 'react'
import { apiurl } from '../apiurl'
import { useParams,useLocation,useNavigate } from 'react-router-dom'
import customFetch from '../authfetch'
import AuthContext from '../../context/AuthContext'
import { Modal } from 'flowbite-react'
import PaymentModal from '../PaymentModal'
import TimingSelector from './TimingSelector'




function Trailer(props){
    const [trailerModal, settrailerModal] = useState(false)
    return (
        <>
        <div>
            <button onClick={()=>settrailerModal(true)} className='text-sm bg-gray-400 p-1 px-2 rounded'>play trailer</button>

        </div>
        <Modal className='' show={trailerModal} position={"center"} onClose={()=>settrailerModal(false)}>
            
        <Modal.Header>{props.movie.name} | Trailer</Modal.Header>
        <iframe className='aspect-video' src={`https://www.youtube.com/embed/${props.movie.trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal>
        </>
    )
}

export default function MovieBookingPage() {
    const authContext = useContext(AuthContext)
    const movieId = useParams().movieId

    // success payment
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
 

    const [movie,setMovie] = useState(null)
    const [mySeats,setMySeats] = useState([])
    const [payment,setPayment] = useState(0)
    const [price,setPrice] = useState(0)

    useEffect(()=>{
        fetch(`${apiurl}/movies/${movieId}`)
        .then(data=>data.json())
        .then(data=>{
            setMovie({...data.movie,movieTimings:data.movieTimings})
            authContext.setAnything({...authContext.anything,moviePdf:data.movie.name})
        })
        .catch(err=>console.log(err))
    },[payment])

    useEffect(() => {
        const s = queryParams.get("s")
        const oid = queryParams.get("oid")
        const refId = queryParams.get("refId")
        const amt = queryParams.get("amt")
        const seats = queryParams.get("seats")
        if (s == '1'){
            // validating transaction
            const payload= {
                bookedSeats:JSON.parse(seats),
                oid,refId,amt
            }
            customFetch(apiurl+"/movies/bookseat/"+movieId,payload)
            .then(data=>{
                authContext.setAlert({type:"success",message:data.message+" Download Ticket Available ay myticket section"})
                setPayment(Math.random())
                authContext.setAnything({...authContext.anything,seatsPdf:JSON.parse(seats)})
                
                              
            })
            .catch(err=>console.log("error",err))
        }else if(s == '0'){
            authContext.setAlert({type:"warning",message:"failed"})
            console.log("payment failed")
        }
        navigate(location.pathname)
    }, [])

  

    

  return (
    <>
        {/* <CustomNavbar /> */}
        
        {movie == null? <h1>Loading</h1>:
            <div className="w-full container md:mx-16 md:mt-10 mx-5 ">
                <div className='md:flex'>
                    <div className='md:w-2/12 sm:w-full md:flex-col flex  dark:text-white capitalize text-2xl text-center'>
                        <div className='w-full'>
                            <img className='' src={movie.thumbnail} alt={movie.name}/>
                        </div>
                        <div className='w-full text-start p-2'>
                            <h1 className=''>{movie.name}<span className='text-xs'>({movie.releaseDate.split(/[-/]/)[0]})</span></h1>
                            <span className='bg-gray-500 text-sm p-1 rounded'>{movie.length} mins</span>
                            <span className='bg-gray-500 text-sm px-2 py-1 rounded mx-2'>{movie.rating}</span>
                            <Trailer movie={movie}/>
                        </div>
                    </div>
                    <div className='dark:text-white md:w-9/12 w-[90%] md:mx-10 text-lg'>
                        <h1 className=''>Now Showing</h1>
                        <div><u>Book Your Seat</u></div>

                        {/* insert timing selector here */}
                        <TimingSelector movie={movie} price={price} setPrice={setPrice} />

                    </div>

                </div>
                <PaymentModal 
                    movie={movie} 
                    price={price} 
                    mySeats={mySeats} 
                    setMySeats={setMySeats} 
                    setPayment={setPayment} 
                    setPrice={setPrice} 
                />
                
            </div>


        
        }

    </>
  )
}
