import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><NavLink to="/" className="nav-link px-2 link-secondary">Home</NavLink></li>
                        <li><NavLink to="/login" className="nav-link px-2 link-dark">Signin</NavLink></li>
                        {/* <li><a href="#" className="nav-link px-2 link-dark">Features</a></li>
                        <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li> */}
                    </ul>

                    {/* <div className="col-md-3 text-end">
                        <button type="button" className="btn btn-outline-primary me-2">Login</button>
                        <button type="button" className="btn btn-primary">Sign-up</button>
                    </div> */}
                </header>
            </div>
        </div>
    )
}

export default Navbar
