// const CreateEvent = () => {

//     const [events, setEvents] =  useState([]);
//     useEffect(()=>{
//         const requestBody = {
//             query: `
//                 query {
//                   events {
//                     _id
//                     title
//                     description
//                     price
//                     date
//                   }
//                 }
//               `
//           };
//           fetch('http://localhost:4616/graphql', {
//             method: 'POST',
//             body: JSON.stringify(requestBody),
//             headers: {    
//                 'Content-Type': 'application/json',
//                 // 'Access-Control-Allow-Origin': '*' 
//             },
//                 // mode: 'cors',
//           })
//             .then(res => res.json())
//             .then(resp=> {
//                 if(resp && resp.data && resp.data.events) 
//                 {
//                     setEvents(resp.data.events);
//                 }
//                 console.log(('immmmm cinayyy',resp.data.events[0].title)) })
//             .catch(err => {
//               console.log('vinay err::',err);
//             });
//     },[])
//     return (
//         <>
//             <div className='bg-warning heightFull'>
//                 <div className='container'>
//                     <div className='row pt-5'>
//                         <div className='col-md-3'></div>
//                         <div className='col-md-6 mt-5'>
//                             <Card className='shadow-lg p-3 mb-5 bg-body rounded'>
//                                 <CardHeader title="Create an event" />
//                                 <CardContent>
                                
//                                 </CardContent>
//                             </Card>
//                         </div>
//                         <div className='col-md-3'></div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default CreateEvent

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: "59px",
    border: "1px solid red",
  }
});

  // const TableCell = withStyles((theme) => ({
  //   head: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //   }
  // }));

export default function Events() {
  const classes = useStyles();

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
          },
        })
          .then(res => res.json())
          .then(resp=> {
              if(resp && resp.data && resp.data.events) 
              {
                  setEvents(resp.data.events);
              }
              console.log(('immmmm cinayyy',resp.data.events[0].title))
            })
          .catch(err => {
            console.log('vinay err::',err);
          });
  },[])

  return (
    <TableContainer component={Paper}>
    {events && events.length > 0 ?
      <Table className={classes.table} aria-label="Our Events">
        <TableHead>
          <TableRow>
            <TableCell>S.no</TableCell>
            <TableCell>Event Title</TableCell>
            <TableCell>Event Description</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((row,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell >{row.title}</TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell >{row.price}</TableCell>
              <TableCell >{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      : <h3 style={{ marginTop: "59px" }}>No records found</h3>
    }
    </TableContainer>
  );
}