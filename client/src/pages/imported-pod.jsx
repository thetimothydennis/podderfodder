import { useEffect } from 'react';
import PropTypes from 'prop-types';

function ImportedPod (props) {
    
    useEffect(() => {
        props.setDocTitle('Adding Pod - Podder Fodder')
    }, [props]);

    return (
        <div className="Epi">
            <br />
            <p>Adding pod. You will be redirected momentarily.</p>
            <img src="waiting.svg" height="300em" />
        </div>
    );
}

ImportedPod.propTypes = {
    setDocTitle: PropTypes.func
}

export default ImportedPod;