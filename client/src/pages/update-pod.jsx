import { useEffect } from 'react';
import PropTypes from 'prop-types';

function UpdatePod (props) {

    useEffect(() => {
        props.setDocTitle('Updating Pod - Podder Fodder')
    }, [props]);

        return (
        <div className="Epi">
            <br />
                <p>Updating pod. You will be redirected shortly.</p>
            <img src="waiting.svg" height="300em" />
        </div>
    );
}

UpdatePod.propTypes = {
    setDocTitle: PropTypes.func
}

export default UpdatePod;