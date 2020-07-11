

import React, { useEffect, useState } from 'react';



export const NavBar = () => {
    const [navBarBackground, setNewBackground] = useState({ background: 'transparent !important' })
    useEffect(() => {
        // effect

        return () => {
            // cleanup
        }
    }, [])
    return (
        <nav style={navBarBackground} className="navbar navbar-dark navbar-expand-lg fixed-top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sitenav001" aria-controls="sitenav001" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-between" id="sitenav001">
                <div>
                    <a className="navbar-brand" href="#">Hidden brand</a>
                </div>
                <div>
                    <ul className="navbar-nav mr-auto justify-content-end mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
                {/* <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
            </div>
        </nav>
    )
}
