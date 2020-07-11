/**
 * Next elements inside this component and assign then with a route property
 */
import propTypes from 'prop-types';
import React, {useState} from 'react';
function Router(props) {
    const [currentRoute, setNewRoute] = useState('/');
    window.setNewRoute = setNewRoute;
    return <div>{props.children.filter(child => child.props.route == currentRoute)[0]}</div>;
}

Router.propTypes = {
    children: propTypes.array
}

export default Router;