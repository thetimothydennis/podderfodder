import { useState, useEffect, useCallback } from 'react';
import { func, string } from 'prop-types';
import axios from 'axios';
import { apiCall } from '../../functions/api-call.jsx';

function PodSearch (props) {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState([]);
    const [feedInput, setFeedInput] = useState('');
    const [render, setRender] = useState();

    async function getSearch(inputStr) {
        let res = await axios.get(
            `${apiCall}/api/search?q=${inputStr}`
        );
        setResponse(res.data.results);
    }

    const handleSubmit = useCallback(async (inputArg) => {
        setRender(<p>Waiting</p>)
        await axios.post(
            `${apiCall}/api/user/${props.userId}`, 
            {
                feedurl: inputArg
            }
        ).then((res) => {
            let pod_id = res.data[0].podcasts.pod_id;
            props.setPodId(pod_id);
            props.setDisplay('onePod');
        })
    }, [props]);

    useEffect(() => {
        props.setDocTitle('Search and Add - Podder Fodder')
    }, [props]);

    useEffect(() => {
        getSearch(input);
    }, [input]);

    useEffect(() => {
        setRender(response.map((item) => (
            <div className="row epiRow" key={item.collectionId}>
                <div className="col-sm">
                    <b>{item.collectionName}</b>
                </div>
                <div className="col-sm">
                    <img alt="podcast_image" 
                        src={item.artworkUrl100} 
                    />
                </div>
                <div className="col-sm allEpiAuthor">
                    {item.artistName}
                </div>
                <div className="col-sm">
                    <a href={item.collectionViewUrl} 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        More details
                    </a>
                </div>
                <div className="col-sm">
                    <button id={-4}
                            type="button"
                            className="btn btn-dark"
                            onClick={() => {
                        handleSubmit(item.feedUrl);
                        }}
                    >
                        Add podcast
                    </button>
                </div>
            </div>
        )));
    }, [input, response, handleSubmit]);
   
    return (
        <div>
            <h1>Search for Podcasts</h1>
                <div className="container">
                    <form className="row form-group" onSubmit={(e) => e.preventDefault()}>
                        <label className="col-sm form-control" htmlFor="feedInput">Input RSS feed URL
                            <input name="feedInput" 
                                    type="text" 
                                    value={feedInput} 
                                    onChange={e => setFeedInput(e.target.value)} 
                                    className="col-sm form-control"/>
                        </label>
                    </form>
                        <button id={-4}
                                type="button"
                                className="btn btn-dark"
                                onClick={() => handleSubmit(feedInput)}>
                            Submit feed
                        </button>
                    <p>or</p>
                    <form className="row form-group" onSubmit={(e) => e.preventDefault()}>
                        <label className="col-sm form-control" htmlFor="searchInput">Type search term
                        <input name="searchInput" 
                                type="text" 
                                value={input} 
                                onChange={e => setInput(e.target.value)} 
                                className="col-sm form-control"
                        /></label>
                    </form>
                </div>
                <div className="container">
                    {render}
            </div>
        </div>
    );
}

PodSearch.propTypes = {
    userId: string,
    setPodId: func,
    setDisplay: func,
    setDocTitle: func
}

export default PodSearch;