import QRCode from 'react-qr-code'
import html2pdf from 'html2pdf.js'
import ReactDOMServer from 'react-dom/server';

function ticketMaker({movie,date,time,location,seats,audi}){
    return (
        <>
        <div className="p-5 w-[300px]" id="container">
            <h1 className="text-2xl">{movie}</h1>
            <div className="flex place-content-between">
                <div>
                    <span className="mdi mdi-calendar-range"> {date}</span>
                </div>
                <div>
                    <span className="mdi mdi-clock-time-eight"></span> {time}
                </div>
            </div>
            <div className="">
                <span className="mdi mdi-map"></span> {location}

            </div>
            <hr className="my-5" />
            
            <div className="flex text-center place-content-around">
                <div className="border-r-2 border-solid border-[red] w-[33.3%]">
                    <div>Ticket</div>
                    <div>{seats && seats.length}</div>
                </div>
                <div className="border-r-2 border-solid border-[red] w-[33.3%]">
                    <div>Audi</div>
                    <div>{audi ? audi : "error fetching audi. Contact admin"}</div>
                </div>
                <div className="w-[33.3%]">
                    <div>seats</div>
                    <div>{seats &&
                        seats.join(", ")
                    }</div>
                </div>
                
            </div>

            <div id="qrcode" className="flex place-content-center mt-5">
                <QRCode value={JSON.stringify({movie,seats})}></QRCode>
            </div>

        </div>
        </>
    )
}

export function seatsEncoder(seats){
    // unencoded seats => ["0-1","1-1"...]
    // encode seats =>["A1","B1"....]
    const encodedSeats = seats.map(seat=>{
        let col = parseInt(seat.split("-")[1])
        let seatId = String.fromCharCode(65 + parseInt(seat.split("-")[0])) + col
        return seatId
    })
    return encodedSeats
}

const handleDownloadTicket = ({movie,date,time,location, seats,audi})=>{
    console.log("downloading")
    const options = {
        margin: 2,
        filename: `${movie}_ticket_${date}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: [90, 170], orientation: 'portrait' }
    };
    const ticket = ticketMaker({movie,date,time,location, seats:seatsEncoder(seats),audi})
    html2pdf(ReactDOMServer.renderToString(ticket),options)
}

export default handleDownloadTicket