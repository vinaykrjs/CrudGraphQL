import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
    border: "2px solid #CCCCCC",
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


export default function Events() {
  const classes = useStyles();
  let history = useHistory();
  const [events, setEvents] =  useState([]);
  useEffect(()=>{
      const requestBody = {
          query: `
              query {
                events {
                  _id
                  name
                  startDate
                  endDate
                  place
                  slots
                  country
                  city
                  state
                }
              }
            `
        };
        fetch('http://localhost:4616/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {    
              'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(resp=> {
              if(resp && resp.data && resp.data.events) 
              {
                  setEvents(resp.data.events);
              }
              console.log(('immmmm cinayyy',resp.data.events[0].name))
            })
          .catch(err => {
            console.log('vinay err::',err);
          });
  },[])
 
 /*  const updateEvent = (_id) => {
    const requestBody = {
          query: `
              mutation {
                  updateEvent( _id: "${_id}", name: "${name}",  startdate: "${startDate}",  Enddate: "${endDate}",  Slots: "${slots}", Place: "${place}",  Country: "${country}",  State: "${state}",  City: "${city}" ) {
                      _id
                      name
                      startDate
                      endDate
                      slots
                      place
                      country
                      state
                      city         
                  }
              }
          `
      };
  fetch(`http://localhost:4616/graphql`,
  {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
  }
)
  .then(res => res.json())
  .then(resp => {
      
      console.log('responseData', resp)
     
  })
  .catch(err => { console.log('Error', err) });
}  */

  const deleteEvent = (_id) => {
    
      const requestBody = {
            query: `
                mutation {
                    deleteEvent( _id: "${_id}" ) {
                        _id
                        name
                    }
                }
            `
        };
    fetch(`http://localhost:4616/graphql`,
    {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    }
)
    .then(res => res.json())
    .then(resp => {
        
        console.log('responseData', resp)
       
    })
    .catch(err => { console.log('Error', err) });
} 
  
  return (
    <div className='bg-warning heightFull'>
            <div className='container'>
            <div className='row pt-5 mt-5 pb-5'>
            <div className='col-md-12'>
    <TableContainer component={Paper}>
    {events && events.length > 0 ?
      <Table className={classes.table} aria-label="Our Events">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr.no</StyledTableCell>
            <StyledTableCell>Event Name</StyledTableCell>
            <StyledTableCell>Start date</StyledTableCell>
            <StyledTableCell >End date</StyledTableCell>
            <StyledTableCell >Place</StyledTableCell>
            <StyledTableCell >Slots</StyledTableCell>
            <StyledTableCell >country</StyledTableCell>
            <StyledTableCell >State</StyledTableCell>
            <StyledTableCell >City</StyledTableCell>
            <StyledTableCell >Operations</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((row,index) => (
            <TableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row._id}
              </StyledTableCell>
              <StyledTableCell >{row.name}</StyledTableCell>
              <StyledTableCell >{row.startDate}</StyledTableCell>
              <StyledTableCell >{row.endDate}</StyledTableCell>
              <StyledTableCell >{row.place}</StyledTableCell>
              <StyledTableCell >{row.slots}</StyledTableCell>
              <StyledTableCell >{row.country}</StyledTableCell>
              <StyledTableCell >{row.state}</StyledTableCell>
              <StyledTableCell >{row.city}</StyledTableCell>  
              <StyledTableCell onClick= {() => history.push(`/edit/${row._id}`)  }>Update</StyledTableCell>     
              <StyledTableCell onClick= {() => deleteEvent(row._id) }>Delete</StyledTableCell>     

              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      : <h3 style={{ marginTop: "59px" }}>No records found</h3>
    }
    </TableContainer>
    </div>
    </div>
    </div>
    </div>
  );
}