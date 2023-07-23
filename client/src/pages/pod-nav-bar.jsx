import React from 'react';

function NavBar () {
    return (
        <div className="NavBar, Epi, Fixed">
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
                    <li>
                        <a href="/api/logout">Logout</a>
                    </li>
                </ul>
        </div>
    );
};

export default NavBar;
