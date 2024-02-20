import React, { useEffect } from 'react'
import { Table } from 'flowbite-react'
import {apiurl} from './apiurl'
import { useState } from 'react'
import handleDownloadTicket,{seatsEncoder} from './TicketTemplate'




function Mytickets() {
  const [myTickets,setMyTickets] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem("token")
    fetch(apiurl+"/tickets",{
      headers:{Authorization:`Bearer ${token}`}
    })
    .then(resp=>resp.json())
    .then(data=>{
      console.log(data)
      setMyTickets(data.data)
    })
    .catch(err=>console.log(err))
    
  },[])

  return (
    <>
        <div className="container md:px-10 px-3 w-[98%] md:overflow-auto overflow-x-scroll">
            <h2 className='text-2xl dark:text-white'>My Tickets</h2>
            <div className=''>
            <Table className=''>
        <Table.Head>
          <Table.HeadCell>Movie</Table.HeadCell>
          <Table.HeadCell>Date/Time</Table.HeadCell>
          <Table.HeadCell>Seats</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Ticket</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            myTickets==null?<h1 className='dark:text-white'>loading</h1> : 
          myTickets.map((ticket,index)=>(
            

          
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {ticket.movie_ref.name}
            </Table.Cell>
            <Table.Cell>{ticket.date + " " + ticket.time || "none"}</Table.Cell>
            <Table.Cell>{seatsEncoder(JSON.parse(ticket.seats)).join(", ")}</Table.Cell>
            <Table.Cell>{ticket.price}</Table.Cell>
            <Table.Cell>
              <button 
              onClick={()=>handleDownloadTicket({
                movie:ticket.movie_ref.name,
                date:ticket.date,
                time:ticket.time,
                location: ticket.audi_ref.location_ref.location,
                seats: JSON.parse(ticket.seats),
                audi:ticket.audi_ref.name
              })}             
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Download
              </button>
            </Table.Cell>
          </Table.Row>
          ))
          }    
        </Table.Body>
      </Table>
      
      </div>
        </div>
          
    </>
  )
}

export default Mytickets