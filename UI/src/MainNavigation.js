import React from 'react';
import { NavLink } from 'react-router-dom'
import "./MainNavigation.css"

const MainNavigation = ()=>{
    return (
        <header>
            <div>WinCo events</div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>
                </ul>
            </nav>
{/* <div>I am  MainNavigation</div> */}
        </header>
    )
  }
   export default MainNavigation;