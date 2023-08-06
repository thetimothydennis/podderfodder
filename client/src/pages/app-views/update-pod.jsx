import { useEffect } from 'react';
import { func } from 'prop-types';

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
    setDocTitle: func
}

export default UpdatePod;