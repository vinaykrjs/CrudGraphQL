import React, { useEffect, useState } from 'react';

const Events = ()=>{
    const [events, setEvents] =  useState([]);
    useEffect(()=>{
        const requestBody = {
            query: `
                query {
                  events {
                    _id
                    title
                    description
                    price
                    date
                  }
                }
              `
          };
          fetch('http://localhost:4616/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {    
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*' 
            },
                // mode: 'cors',
          })
            .then(res => res.json())
            .then(resp=> {
                if(resp && resp.data && resp.data.events) 
                {
                    setEvents(resp.data.events);
                }
                console.log(('immmmm cinayyy',resp.data.events[0].title)) })
            .catch(err => {
              console.log('vinay err::',err);
            });
    },[])
   
    return (
      <div>I am in Event page
      <h1>event are :</h1>
      <ul>
        { events && events.length > 0 && <>
            {events.map((event,index)=> (<div key={index}>
                <li> {event._id} </li>
                <li> {event.title} </li>
                <li> {event.description} </li>
                <li> {event.price} </li>
                <li> {event.date} </li>
             </div> ))}
        </>
        } 
      </ul>
      </div>
    )
  }
export default Events;