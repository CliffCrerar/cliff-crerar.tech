/**
 * Use this as wrapper to create route links
 */
import React from 'react';
import propTypes from 'prop-types'
function Link({ href, children ,className}) {
    function clickAnchor(ev) {
        ev.persist();
        ev.preventDefault();
        ev.stopPropagation();
        window.setNewRoute(href);
        window.history.replaceState({ name: '' }, '', href.toString())
    }
    return <a className={className} onClick={ev => clickAnchor(ev)} href="{href}">{children}</a>;
}

Link.prototypes = {
    navTo: propTypes.string,
    children: propTypes.array,
    className: propTypes.string
}
Link.defaultProps = {
    navTo: '/',
    children: null,
    className: null
}

export default Link;