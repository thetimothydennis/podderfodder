import { useEffect } from 'react';
import PropTypes from 'prop-types';

function DeletePod (props) {

    useEffect(() => {
        props.setDocTitle('Pod Deleted - Podder Fodder')
    }, [props]);

        return (
        <div className="Epi">
            <br />
            <p>Podcast deleted</p>
            <img src="waiting.svg" height="300em" />
        </div>
    );
}

DeletePod.propTypes = {
    setDocTitle: PropTypes.func
}

export default DeletePod;