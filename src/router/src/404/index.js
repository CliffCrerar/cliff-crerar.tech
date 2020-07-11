
import React from 'react';
import propTypes from 'prop-types';
function PageNotFound(props) {
    const text = 'Not Found';
    return (
        <React.Fragment>
            <h1>404:</h1> 
            <h2>{text}</h2>

            <h3>Check your route:</h3>
            <p>{props.route}</p>
        </React.Fragment>
    )
}
export default PageNotFound;

PageNotFound.propTypes = {
    route: propTypes.string
}