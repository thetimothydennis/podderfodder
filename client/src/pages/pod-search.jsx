import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { apiCall } from '../functions/api-call.jsx';

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
    };

    useEffect(() => {
        getSearch(input);
    }, [input]);

    useEffect(() => {
        setRender(response.map((item) => (
            <div className="row epiRow" key={item.collectionId}>
                <div className="col">
                    {item.collectionName}
                </div>
                <div className="col">
                    <img alt="podcast_image" 
                        src={item.artworkUrl100} 
                    />
                </div>
                <div className="col">
                    {item.artistName}
                </div>
                <div className="col">
                    <a href={item.collectionViewUrl} 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        Link
                    </a>
                </div>
                <div className="col">
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
    }, [input, response]);

    const handleSubmit = async (inputArg) => {
        setRender(<p>Waiting</p>)
        await axios.post(
            `${apiCall}/api/user/${props.userId}`, 
            {
                feedUrl: inputArg
            }
        ).then((res) => {
            let pod_id = res.data[0].podcasts.pod_id;
            props.setPodId(pod_id);
            props.setDisplay('onePod')
        })
    };
   
    return (
        <div>
            <h1>Search for Podcasts</h1>
                <div className="container">
                    <form className="row form-group" onSubmit={(e) => e.preventDefault()}>
                        <label className="col form-control" htmlFor="feedInput">Input RSS feed URL
                        <input name="feedInput" 
                                type="text" 
                                value={feedInput} 
                                onChange={e => setFeedInput(e.target.value)} 
                                className="col form-control"
                        /></label>
                    </form>
                        <button id={-4}
                                type="button"
                                className="btn btn-dark"
                                onClick={() => handleSubmit(feedInput)}
                        >
                            Submit feed
                        </button>
                    <p>or</p>
                    <form className="row form-group" onSubmit={(e) => e.preventDefault()}>
                        <label className="col form-control" htmlFor="searchInput">Type search term
                        <input name="searchInput" 
                                type="text" 
                                value={input} 
                                onChange={e => setInput(e.target.value)} 
                                className="col form-control"
                        /></label>
                    </form>
                </div>
                <div className="container">

                        <div className="row epiRow">
                            <div className="col">
                                Podcast Name
                            </div>
                            <div className="col">
                                Artwork
                            </div>
                            <div className="col">
                                Artist
                            </div>
                            <div className="col">
                                Preview feed
                            </div>
                            <div className="col">
                                Link to RSS
                            </div>
                        </div>
                    {render}
            </div>
        </div>
    );
};

export default PodSearch;
