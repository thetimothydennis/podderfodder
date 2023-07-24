import React from 'react';
import { Cookies } from 'react-cookie';

function NavBar () {
    const handleClick = (e) => {
        const cookie = new Cookies();
        cookie.removeCookie('userId');
    };

    return (
        <div className="NavBar, Epi, Fixed">
                <ul className="NavBar">
                    <li id={-3}>
                        <b id={-3}>
                            Search and Add
                        </b>
                    </li>
                    <li id={-1} >
                        <b id={-1}>
                            All Podcasts
                        </b>
                    </li>
                    <li id={-2}>
                        <b id={-2}>
                            All Episodes
                        </b>
                    </li>
                    <li>
                        <b>
                            <a onClick={handleClick} href="/api/logout">Logout</a>
                        </b>
                    </li>
                </ul>
        </div>
    );
};

export default NavBar;
