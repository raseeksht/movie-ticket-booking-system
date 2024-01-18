import React, { useEffect } from 'react'
import CustomNavbar from './CustomNavbar'
import { Table } from 'flowbite-react'
import {apiurl} from './apiurl'
import customFetch from "./authfetch"
import { useState } from 'react'




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
        <CustomNavbar />
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
          myTickets.map(ticket=>(

          
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {ticket.movie_ref.name}
            </Table.Cell>
            <Table.Cell>{ticket.date + " " + ticket.time}</Table.Cell>
            <Table.Cell>{ticket.seats}</Table.Cell>
            <Table.Cell>{ticket.price}</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Download
              </a>
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