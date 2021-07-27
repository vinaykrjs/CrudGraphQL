import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const Signup = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className='bg-warning heightFull'>
            <div className='container'>
                <div className='row pt-5'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6 mt-5'>
                        <Card className='shadow-lg p-3 mb-5 bg-body rounded'>
                            <CardHeader title="Sign To The Portal" />
                            <CardContent>
                                <form class="row g-3">
                                    <div class="col-md-6">
                                        <TextField id="standard-basic" label="Name" />
                                    </div>
                                    <div class="col-md-6 mt-0">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justifyContent="space-around">
                                                <KeyboardDatePicker margin="normal" id="date-picker-dialog"
                                                    label="DOB" format="MM/dd/yyyy" value={selectedDate}
                                                    onChange={handleDateChange} KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div class="col-md-6">
                                        <TextField id="standard-basic" label="Email" />
                                    </div>
                                    <div class="col-md-6">
                                        <TextField id="standard-password-input" label="Password" type="password" />
                                    </div>
                                    <div class="col-12">
                                        <TextField className='w-100' id="standard-basic" label="Address 1" placeholder="1234 Main St" multiline />
                                    </div>
                                    <div class="col-12">
                                        <TextField className='w-100' id="standard-basic" label="Address 2" placeholder="Apartment, studio, or floor" multiline />
                                    </div>
                                    <div class="col-md-4">
                                        <FormControl className='w-100'>
                                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                onChange={handleChange}>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div class="col-md-4">
                                        <FormControl className='w-100'>
                                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                onChange={handleChange}>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div class="col-md-4">
                                        <FormControl className='w-100'>
                                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                onChange={handleChange}>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div class="col-12">
                                        <Button variant="contained">SignUp</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='col-md-3'></div>
                </div>
            </div>
        </div>
    )
}

export default Signup
