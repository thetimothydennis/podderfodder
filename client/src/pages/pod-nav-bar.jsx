import React from 'react';

function NavBar () {
    return (
        <div className="NavBar, Epi">
           <ul className="NavBar">
           <li id={-3}>
                Search and Add
            </li>
            <li id={-1} >
                All Podcasts
            </li>
            <li id={-2}>
                All Episodes
            </li>
            </ul>
        </div>
    );
};

export default NavBar;
