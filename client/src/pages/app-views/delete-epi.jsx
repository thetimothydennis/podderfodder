import { useEffect } from 'react';
import { func } from 'prop-types';

function DeleteEpi (props) {

    useEffect(() => {
        props.setDocTitle('Episode Deleted - Podder Fodder')
    }, [props]);

    return (
        <div className="Epi">
            <br />
            <p>Episode deleted</p>
            <img src="waiting.svg" height="300em" />
        </div>
    );
}

DeleteEpi.propTypes = {
    setDocTitle: func
}

export default DeleteEpi;