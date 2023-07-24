import React from 'react';
import { Cookies } from 'react-cookie';

function NavBar () {
    const handleClick = (e) => {
        const cookie = new Cookies();
        cookie.removeCookie('userId');
    };

    return (
        <div className="container NavBar">
                <div className="row NavBar">
                    <div className="col-3" id={-3}>
                        <b id={-3}>
                            Search and Add
                        </b>
                    </div>
                    <div className="col-3" id={-1} >
                        <b id={-1}>
                            All Podcasts
                        </b>
                    </div>
                    <div className="col-3" id={-2}>
                        <b id={-2}>
                            All Episodes
                        </b>
                    </div>
                    <div className="col-3">
                        <b>
                            <a onClick={handleClick} href="/api/logout">Logout</a>
                        </b>
                    </div>
                </div>
        </div>
    );
};

export default NavBar;
