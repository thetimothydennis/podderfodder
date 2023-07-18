import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function PodSearch () {
    const { user, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState("");

    const [input, setInput] = useState('');
    const [response, setResponse] = useState([]);
    const [feedInput, setFeedInput] = useState('');
    const [render, setRender] = useState()
    const [userId, setUserId] = useState("");

    const apiCall = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PORT}`

    let config = { 
        headers: { 
            Authorization: `Bearer ${accessToken}` 
        } 
    };

    async function insertUser() {
        let res = await axios.post(
            `${apiCall}/api/user`,
            {name: user.name, email: user.email},
            config
        );
        setUserId(res.data._id);
    };

    async function getSearch(inputStr) {
        let res = await axios.get(
            `${apiCall}/api/search?q=${inputStr}`
        );
        setResponse(res.data.results);
    };

    function getToken () {
        getAccessTokenSilently().then(
            res => {
                setAccessToken(res);
            }
        );
    };

    useEffect(() => {
        getToken();
        insertUser();
    });

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
            `${apiCall}/api/user/${userId}`, 
            {
                feedUrl: inputArg
            },
            config
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
