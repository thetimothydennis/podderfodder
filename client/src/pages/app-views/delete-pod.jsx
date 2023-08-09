import { useEffect } from 'react';
import { func } from 'prop-types';

function DeletePod (props) {

    useEffect(() => {
        props.setDocTitle('Pod Deleted - Podder Fodder')
    }, [props]);

        return (
        <div className="Epi">
            <br />
            <p>Podcast deleted</p>
            <img className="waiting" src="waiting.svg" height="300em" />
        </div>
    );
}

DeletePod.propTypes = {
    setDocTitle: func
}

export default DeletePod;