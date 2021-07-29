import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateEvent from '../Components/CreateEvent/CreateEvent';
import Signup from '../Components/SignUp/Signup';
import Login from '../Components/login/Login';
import Events from '../Components/Events/Events';

const MainRoute = () => {
    return (
        <Switch>
            <Route path='/' component={Login} exact/>
            <Route path='/signup' component={Signup} exact />
            <Route path='/create' component={CreateEvent} exact />
            <Route path='/events' component={Events} exact />
        </Switch>
    )
}

export default MainRoute
