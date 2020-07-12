

import React, { useEffect, useState } from 'react';
import { Link } from '../../router'


export const NavBar = () => {
    const [navBarBackground, setNewBackground] = useState({ background: 'transparent !important' })
    useEffect(() => {
        // effect

        return () => {
            // cleanup
        }
    }, [])
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">Site In Dev</a>
      
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" href="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" href="page-two">Page2</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" href="page-three">Page3</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" href="page-error">PageError</Link>
            </li>
          </ul>

        </div>
      </nav>
    )
}
