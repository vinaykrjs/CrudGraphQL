import React from 'react'
import { NavLink } from 'react-router-dom';
import EventSeatIcon from '@material-ui/icons/EventSeat';

const MainNav = (props) => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to='/'>
                    <EventSeatIcon className='mb-1' /> Event Application
                </NavLink>
                {/* {props.isLogin && */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to='/create'>Create Event</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to='/events'>All Events</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>
                    </div>
                {/* } */}
            </div>
        </nav>
    )
}

export default MainNav
