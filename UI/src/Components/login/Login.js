import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory();
    const startSignUp = () => {
        history.push('/signup')
    }

    return (
        <div className='bg-warning heightFull'>
            <div className='container'>
                <div className='row pt-5'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4 mt-4 pt-5'>
                        <Card className='shadow-lg p-3 mb-5 bg-body rounded'>
                            <CardHeader title="Login To The Portal"/>
                            <CardContent>
                                <form noValidate autoComplete="off">
                                    <TextField className='w-100' id="standard-basic" label="Email Id" />
                                    <TextField className='w-100 mt-2' id="standard-basic" label="Password" />
                                    <div className='pt-5'>
                                        <Button variant="contained" className='me-3'>Login</Button>
                                        <Button onClick={startSignUp} variant="contained">SignUp</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        </div>
    )
}

export default Login
