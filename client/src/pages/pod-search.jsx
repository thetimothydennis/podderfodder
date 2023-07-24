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
            <div className="row" key={item.collectionId}>
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
        await axios.post(
            `${apiCall}/api/user/${props.userId}`, 
            {
                feedUrl: inputArg
            }
        );
    };
   
    return (
        <div className="Epi">
            <h1>Search for Podcasts</h1>
                <div className="inputForms">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="feedInput">Input RSS feed URL</label>
                        <input name="feedInput" 
                                type="text" 
                                value={feedInput} 
                                onChange={e => setFeedInput(e.target.value)} 
                        />
                        <button id={-4} 
                                onClick={() => handleSubmit(feedInput)}
                        >
                            Submit feed
                        </button>
                    </form>
                    <p>or</p>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="searchInput">Type search term</label>
                        <input name="searchInput" 
                                type="text" 
                                value={input} 
                                onChange={e => setInput(e.target.value)} 
                        />
                    </form>
                </div>
                <div className="container">

                        <div className="row">
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
