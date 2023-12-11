import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import myImage from './photos/AlbumIcone.png';
import './css/albums.css'

export default function Albums() {

    // Get userID
    let userID = localStorage.getItem("id");

    // Get albums
    const [data, setData] = useState([])

    let res;
    let getData;

    async function getAlbums() {
        try {
            res = await fetch(`http://localhost:3500/users/${userID}/albums`);
            getData = await res.json();
            setData(getData)
        } catch (error) {
            alert(error, "network error")
        }
    }
    useEffect(() => {
        getAlbums();

    }, [userID])

    function sortAB() {
        let newData = [...data];
        newData.sort((a, b) => {
            if (a.title < b.title) {
                return -1
            }
            else if (a.title > b.title) {
                return 1
            }
            else {
                return 0
            }
        })
        return newData
    }



    return (
        <div style={{ margin: "auto", width: "75%", textAlign: 'center' }}>
            <h1>My Albums</h1>
            <div >
                {sortAB().map((album, idx) =>
                    <div key={idx}>
                        <NavLink
                            to={`${album.id}`}
                            state={{ album: album.title }}
                            key={idx}
                            className="mainAlbums"
                        >
                            <div>
                                <img src={myImage} style={{ width: "50%", height: "auto" }} />
                                <h2 style={{ textTransform: "capitalize" }}>{album.title}</h2>
                            </div>

                        </NavLink>

                    </div>
                )}
            </div>
        </div>
    );
}

