import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="text-center text-lg-start text-white" style={{backgroundColor: "#45526e"}}>
                <div className="container p-3 pb-0">
                    <hr className="my-3" />
                    <section className="p-3 pt-0">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-7 col-lg-8 text-center text-md-start">
                                <div className="p-3">
                                    © 2020 Copyright: Event Application
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                <NavLink to='#' className="btn btn-outline-light btn-floating m-1" className="text-white" role="button" >
                                    <FacebookIcon />
                                </NavLink>
                                <NavLink to='#' className="btn btn-outline-light btn-floating m-1" className="text-white" role="button" >
                                    <TwitterIcon />
                                </NavLink>
                                <NavLink to='#' className="btn btn-outline-light btn-floating m-1" className="text-white" role="button">
                                    <InstagramIcon />
                                </NavLink>
                            </div>
                        </div>
                    </section>
                </div>
            </footer>
        </div>
    )
}

export default Footer
