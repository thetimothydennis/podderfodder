import React, { useState, useEffect } from 'react';
// import '../Epi.css';
import axios from 'axios';
// import { useAuth0 } from '@auth0/auth0-react';

function AllEpis () {
    // const { user, getAccessTokenSilently } = useAuth0();
    const [episodes, setEpisodes] = useState([]);
    const [epiId, setEpiId] = useState("");
    const [userId, setUserId] = useState("");
    const [podId, setPodId] = useState("");
    // const [accessToken, setAccessToken] = useState("");

    const user = {
        name: "Timothy Dennis",
        email: "timothyddennis@gmail.com"
    }

    async function insertUser() {
        // let res = await axios.post(
        //     `https://timothyddennis.com:9000/api/user`, 
        //     { 
        //         user: {
        //             name: user.name, 
        //             email: user.email
        //         } 
        //     }
        // );
        // setUserId(res.data.user_id);
        let res = await axios.post(
            `http://localhost:9000/api/user`, {name: user.name, email: user.email}
        );
        setUserId(res.data[0].user_id);
    };

    async function getAllEpis() {
        let res = await axios.get(
            `http://localhost:9000/api/allepisodes/${userId}`/* ,
            { 
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                } 
            } */
        );
        console.log(res.data)
        setEpisodes(res.data);
    };

    // function getToken () {
    //     getAccessTokenSilently().then(
    //         res => {
    //             setAccessToken(res);
    //         }
    //     );
    // };

    useEffect(() => {
        // getToken();
        insertUser();
    });

    useEffect(() => {
        getAllEpis();
    }, [userId]);

    // const handleOtherClick = async (e) => {
    //     await axios.delete(
    //         `http://localhost:9000/api/user/${userId}/${podId}/${e.target.value}`,
    //         { 
    //             headers: { 
    //                 Authorization: `Bearer ${accessToken}`
    //             } 
    //         }
    //     );
    // };

    const handleClick = (e) => {
        console.log(e.target.id);
        console.log(e.target.value);
        setPodId(e.target.value);
        setEpiId(e.target.id);
    };

    return (
        <div className="Epi">
            <h1>
                All Episodes
            </h1>
            <table className="episodes">
                <thead>
                    <tr className="epiRow">
                        <th>
                            Title
                        </th>
                        <th>
                            Show
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Duration
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                {episodes.map((item, x) => (
                    <tr className="epiRow" 
                        onClick={handleClick} 
                        key={x} 
                        id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                    >
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.title}
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.show_title}
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            { item.podcasts.author.slice(0, 25) }
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {Math.round(item.podcasts.episodes.duration / 60)} min.
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.content.slice(0, 100)}
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.pubDate.toString().slice(0, 10)}
                        </td>
                        {/* <td>
                            <button id={-7} 
                                    value={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`} 
                                    // onClick={handleOtherClick}
                            >Delete
                            </button>
                        </td> */}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllEpis;
