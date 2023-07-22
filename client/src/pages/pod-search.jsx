import React, {useState, useEffect} from 'react';
import axios from 'axios';

function PodSearch (props) {

    const [input, setInput] = useState('');
    const [response, setResponse] = useState([]);
    const [feedInput, setFeedInput] = useState('');
    const [render, setRender] = useState();

    const apiCall = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PORT}`

    async function getSearch(inputStr) {
        let res = await axios.get(
            `${apiCall}/api/search?q=${inputStr}`
        );
        setResponse(res.data.results);
    };

    useEffect(() => {
        getSearch(input);
    }, [input])

    useEffect(() => {
        setRender(response.map((item) => (
            <tr key={item.collectionId}>
                <td>
                    {item.collectionName}
                </td>
                <td>
                    <img alt="podcast_image" 
                        src={item.artworkUrl100} 
                    />
                </td>
                <td>
                    {item.artistName}
                </td>
                <td>
                    <a href={item.collectionViewUrl} 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        Link
                    </a>
                </td>
                <td>
                    <button id={-4} 
                            onClick={() => {
                        handleSubmit(item.feedUrl);
                        }}
                    >
                        Add podcast
                    </button>
                </td>
            </tr>
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
                <table className="searchTable">
                    <thead>
                        <tr>
                            <th>
                                Podcast Name
                            </th>
                            <th>
                                Artwork
                            </th>
                            <th>
                                Artist
                            </th>
                            <th>
                                Preview feed
                            </th>
                            <th>
                                Link to RSS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {render}
                </tbody>
            </table>
        </div>
    )
};

export default PodSearch;
