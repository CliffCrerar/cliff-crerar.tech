
import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function PageNotFound(props) {
    const text = 'Not Found';
    return (
        
            <div className="style404">
                <header style={{height:'64px'}}></header>
                <h1>404:</h1>
                <h2>{text}</h2>
                <h3>Check your route:</h3>
                <code>{props.route}</code>
            </div>
        
    )
}
export default PageNotFound;

PageNotFound.propTypes = {
    route: propTypes.string
}