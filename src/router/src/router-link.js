/**
 * Use this as wrapper to create route links
 */
import React from 'react';
import propTypes from 'prop-types'
function Link({ navTo, children }) {
    function clickAnchor(ev) {
        ev.persist();
        ev.preventDefault();
        ev.stopPropagation();
        window.setNewRoute(navTo);
        window.history.replaceState({ name: '' }, '', navTo.toString())
    }
    return <a onClick={ev => clickAnchor(ev)} href="{navTo}">{children}</a>;
}

Link.prototypes = {
    navTo: propTypes.string,
    children: propTypes.array
}
Link.defaultProps = {
    navTo: '/',
    children: null
}

export default Link;