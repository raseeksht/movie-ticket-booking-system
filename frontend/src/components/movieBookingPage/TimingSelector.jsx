import React, { useState, useEffect } from 'react';
import { Accordion, Select } from 'flowbite-react';
import RenderSeats from './RenderSeats';
// import {useAccordian} from 'flowbite-react';
function TimingSelector(props) {
  const [branches, setBranches] = useState({ active: 'all' });
  const [dates, setDates] = useState({ active: "all" });
  const [times, setTimes] = useState({ active: "all" });
  const [seatsArrangement, setSeatsArrangement] = useState(null);


  useEffect(() => {
    const groupedBranches = props.movie.movieTimings.reduce((acc, currentItem) => {
      const location = currentItem.audi_ref.location_ref.location;
      if (!acc[location]) {
        acc[location] = []
      }
      acc[location].push(currentItem)
      return acc
    }, {})
    console.log(groupedBranches)
    setBranches({ ...branches, "uniqueBranches": groupedBranches })
  }, [])

  useEffect(() => {
    // run when user selects any location and updates the dates states
    const groupedDates = props.movie.movieTimings.reduce((acc, currentItem) => {
      const date = currentItem.date
      if (currentItem.audi_ref.location_ref.location == branches.active) {
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(currentItem)
      }
      return acc
    }, {})
    console.log(groupedDates)
    // setDates({ ...dates, uniqueDates: groupedDates })
    setDates(prevDates => ({ active: "all", uniqueDates: groupedDates }));

  }, [branches.active])

  useEffect(() => {
    // run when user selects any location and updates the times states
    // setTimes({...times,active:"all"})
    const groupedTimes = props.movie.movieTimings.reduce((acc, currentItem) => {
      const time = currentItem.time
      if (currentItem.date == dates.active) {
        if (!acc[time]) {
          acc[time] = []
        }
        acc[time].push(currentItem)
      }
      return acc
    }, {})
    console.log("groupedTimes ", groupedTimes)
    setTimes({ ...times, uniqueTimes: groupedTimes })

  }, [dates.active])

  // setTimes({ ...times, active: times.uniqueTimes[time][0].time })

  const handleTimeClick = (time) => {
    setTimes({ ...times, active: times.uniqueTimes[time][0].time })
    const choices = props.movie.movieTimings.filter(currentItem => {
      if (currentItem.time == time && currentItem.date == dates.active && currentItem.audi_ref.location_ref.location == branches.active){
        return true
      }else{
        return false
      }
    })
    setSeatsArrangement(choices[0].seats_status)
  }

  return (
    <>
      <h1>Timing Selector</h1>
      <Accordion>
        <Accordion.Panel aria-expanded={false}>
          <Accordion.Title>Select Date/Time</Accordion.Title>
          <Accordion.Content>
            {props.movie ?

              <>
                <div className='location-list'>
                  <button
                    className={`rounded-md px-2 ${branches.active == "all" ? "bg-red-500" : ""}`}
                    onClick={() => setBranches({ ...branches, active: "all" })}
                  >All</button>
                  {branches.uniqueBranches && Object.keys(branches.uniqueBranches).map(branch => (
                    <button
                      className={`${branches.active == branches.uniqueBranches[branch][0].audi_ref.location_ref.location ? "bg-red-500" : ""} mx-2 rounded-md px-2`}
                      key={branches.uniqueBranches[branch][0].audi_ref.location_ref._id}
                      onClick={() => setBranches({ ...branches, active: branches.uniqueBranches[branch][0].audi_ref.location_ref.location })}
                    >
                      {branches.uniqueBranches[branch][0].audi_ref.location_ref.location}
                    </button>
                  ))}

                </div>

                <div className='dates'>
                  <button
                    className={`rounded-md px-2 ${dates.active == "all" ? "bg-red-500" : ""}`}
                    onClick={() => setDates({ ...dates, active: "all" })}
                  >All</button>
                  {dates.uniqueDates && Object.keys(dates.uniqueDates).map(date => (
                    <button
                      className={`${dates.active == dates.uniqueDates[date][0].date ? "bg-red-500" : ""} mx-2 rounded-md px-2`}
                      key={dates.uniqueDates[date][0].date}
                      onClick={() => setDates({ ...dates, active: dates.uniqueDates[date][0].date })}
                    >
                      {dates.uniqueDates[date][0].date}
                    </button>
                  ))}

                </div>

                <div className='times'>
                  <button
                    className={`rounded-md px-2 ${times.active == "all" ? "bg-red-500" : ""}`}
                    onClick={() => setTimes({ ...times, active: "all" })}
                  >All</button>
                  {times.uniqueTimes && Object.keys(times.uniqueTimes).map(time => (
                    <button
                      className={`${times.active == times.uniqueTimes[time][0].time ? "bg-red-500" : ""} mx-2 rounded-md px-2`}
                      key={times.uniqueTimes[time][0].time}
                      onClick={() => handleTimeClick(time)}
                    >
                      {times.uniqueTimes[time][0].time}
                    </button>
                  ))}

                </div>
              </>
              :
              <h1 className='dark:text-white'>Loading...</h1>
            }


          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel aria-expanded={true}>
          <Accordion.Title>Select Your Seats</Accordion.Title>
          <Accordion.Content>
            <RenderSeats seatsArrangement={seatsArrangement} price={props.price} setPrice={props.setPrice} />
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
}

export default TimingSelector;
