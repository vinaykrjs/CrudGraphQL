import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const Login = () => {
    return (
        <div className='container'>
            <div className='row pt-5'>
                <div className='col-md-4'></div>
                <div className='col-md-4 mt-4'>
                    <Card className='shadow-lg p-3 mb-5 bg-body rounded'>
                        <CardHeader title="Login To The Portal"/>
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <TextField id="standard-basic" label="Email Id" />
                                <TextField className='mt-2' id="standard-basic" label="Password" />
                            </form>
                        </CardContent>
                        <CardActions className='justify-content-center'>
                            <Button variant="contained">Login</Button>
                        </CardActions>
                    </Card>
                </div>
                <div className='col-md-4'></div>
            </div>
        </div>
    )
}

export default Login
