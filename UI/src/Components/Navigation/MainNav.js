import React from 'react'
import EventSeatIcon from '@material-ui/icons/EventSeat';

const MainNav = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <EventSeatIcon className='mb-1' />
                    <span className="navbar-brand ms-2 mb-0 h1">Event Application</span>
                </a>
            </div>
        </nav>
    )
}

export default MainNav
