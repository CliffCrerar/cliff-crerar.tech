/**
 * Next elements inside this component and assign then with a route property
 */
import propTypes from 'prop-types';
import React, { useState } from 'react';
import PageNotFound from './404';
function Router(props) {
    const [currentRoute, setNewRoute] = useState('/');
    window.setNewRoute = setNewRoute;
    try {
        const Page = props.children.filter(child => child.props.route == currentRoute)[0];
        if(!Page){
            return <PageNotFound route={currentRoute}/>
        } else {
            return Page;
        }
    } catch (error) {
        throw error;
    }
}

Router.propTypes = {
    children: propTypes.array
}

export default Router;