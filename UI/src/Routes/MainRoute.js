import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../Components/Index/Index';

const MainRoute = () => {
    return (
        <Switch>
            <Route path='/' component={Index} />
        </Switch>
    )
}

export default MainRoute
