import { useEffect } from 'react';
import PropTypes from 'prop-types';

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
    setDocTitle: PropTypes.func
}

export default DeleteEpi;