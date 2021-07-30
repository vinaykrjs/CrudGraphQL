import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useHistory } from 'react-router';

const CreateEvent = () => {
    let isCountry = false
    let history = useHistory();
    const [endDate, setEndDate] = useState(new Date());
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const [startDate, setStartDate] = useState(new Date());
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const [formData, changeFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        slots: '',
        place: '',
        country: '',
        state: '',
        city: ''
    })

    const [countries, changeCountries] = useState([])
    const [state, changeState] = useState([])
    const [city, changeCity] = useState([])

    const handleInputEvent = (event) => {
        const { name, value } = event.target;
        changeFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    const handleCountryChange = (event) => {
        axios.get(`https://www.universal-tutorial.com/api/states/${event.target.value}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Accept": "application/json"
            }
        }).then((stateData) => {
            changeState(stateData.data)
            const { name, value } = event.target;
            changeFormData((prev) => {
                return {
                    ...prev, [name]: value
                }
            })
        }).catch(error => {
            console.log(error)
        })
    };

    const handleStateChange = (event) => {
        axios.get(`https://www.universal-tutorial.com/api/cities/${event.target.value}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Accept": "application/json"
            }
        }).then((cityData) => {
            
            changeCity(cityData.data)
            const { name, value } = event.target;
            changeFormData((prev) => {
                return {
                    ...prev, [name]: value
                }
            })
        }).catch(error => {
            console.log(error)
        })
    };

    useEffect(() => {
        if (!isCountry) {
            axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
                headers: {
                    "Accept": "application/json",
                    "api-token": "nax9GJbiCbMEJDIEfNBLr0M-Pm-maT-a9dLUxC27673n3h_gtiN640Rn-nUQIu38YU4",
                    "user-email": "dazler4327@gmail.com"
                }
            }).then(data => {
                localStorage.setItem('token', data.data.auth_token);
                axios.get("https://www.universal-tutorial.com/api/countries", {
                    headers: {
                        "Authorization": `Bearer ${data.data.auth_token}`,
                        "Accept": "application/json"
                    }
                }).then((countryData) => {
                    isCountry = true
                    changeCountries(countryData.data)
                }).catch(error => {
                    console.log(error)
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }, [])

    const submitData = (event) => {
        event.preventDefault();
        
        formData.startDate = startDate;
        formData.endDate = endDate;
        const requestBody = {
            query: `
                mutation {
                    createEvent(eventInput: {name: "${formData.name}", startDate: "${formData.startDate}", endDate: "${formData.endDate}", slots: "${formData.slots}", place: "${formData.place}", country: "${formData.country}", state: "${formData.state}", city: "${formData.city}"}) {
                        _id
                        name
                    }
                }
            `
        };
        fetch("http://localhost:4616/graphql",
            {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            }
        )
            .then(res => res.json())
            .then(resp => {
                
                console.log('responseData', resp)
                history.push('/events')
            })
            .catch(err => { console.log('Error', err) });
    }


    return (
        <>
            <div className='bg-warning heightFull'>
                <div className='container'>
                    <div className='row pt-5'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6 mt-5'>
                            <Card className='shadow-lg p-3 mb-5 bg-body rounded'>
                                <CardHeader title="Create an event" />
                                <CardContent>
                                    <form className="row g-3" onSubmit={submitData}>
                                        <div className="col-12">
                                            <TextField name='name' onChange={handleInputEvent} value={formData.name} className='w-100' id="standard-basic" label="Event Name" multiline />
                                        </div>
                                        <div className="col-md-6 mt-0">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justifyContent="space-around">
                                                    <KeyboardDatePicker margin="normal" id="date-picker-dialog" name='startDate' value={startDate}
                                                        label="Start Date" onChange={handleStartDateChange} format="MM/dd/yyyy" KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <div className="col-md-6 mt-0">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justifyContent="space-around">
                                                    <KeyboardDatePicker margin="normal" id="date-picker-dialog" name='endDate' value={endDate}
                                                        label="End Date" format="MM/dd/yyyy" onChange={handleEndDateChange} KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <div className="col-12">
                                            <TextField name='slots' onChange={handleInputEvent} value={formData.slots} className='w-100' id="standard-basic" label="Slots" type='number' multiline />
                                        </div>
                                        <div className="col-12">
                                            <TextField name='place' onChange={handleInputEvent} value={formData.place} className='w-100' id="standard-basic" label="Place" placeholder="Apartment, studio, or floor" multiline />
                                        </div>
                                        <div className="col-md-4">
                                            <FormControl className='w-100'>
                                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name='country' value={formData.country}
                                                    onChange={handleCountryChange}>
                                                    {countries.map((data, index) => {
                                                        return <MenuItem key={index} value={data.country_name}>{data.country_name}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-4">
                                            <FormControl className='w-100'>
                                                <InputLabel id="demo-simple-select-label">State</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name='state' value={formData.state}
                                                    onChange={handleStateChange}>
                                                    {state.map((data, index) => {
                                                        return <MenuItem key={index} value={data.state_name}>{data.state_name}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-4">
                                            <FormControl className='w-100'>
                                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name='city' value={formData.city} onChange={handleInputEvent}>
                                                    {city.map((data, index) => {
                                                        
                                                        return <MenuItem key={index} value={data.city_name}>{data.city_name}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-12">
                                            <Button type="submit" variant="contained">Create Event</Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateEvent
