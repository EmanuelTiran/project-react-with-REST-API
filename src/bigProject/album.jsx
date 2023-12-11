import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import arrowPic from './photos/left-arrow.png';
import myImage from './photos/photos.png';
import './css/album.css'

let slideRef;
export default function Album() {

    let { albumID } = useParams();
    let location = useLocation();
    let albumTitle = location.state.album;

    // Get photos
    const [data, setData] = useState([]);


    let res;
    let getData;

    async function getPhotos() {
        try {
            res = await fetch(`http://localhost:3500/albums/${albumID}/photos`);
            getData = await res.json();
            setData([...getData])
        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getPhotos()

    }, [])




    return (
        <div style={{ margin: "auto", width: "75%" }}>
            <div className='back'>
                <Link to={"/home/albums"}>
                    <img src={arrowPic} style={{ width: "100%", height: "auto" }} />
                </Link>
            </div>

            <div className='titleAlbm' >
                <img src={myImage} style={{ width: "55%", height: "auto" }} />
                <div>{albumTitle}</div>
            </div>
            <div  >
                <Carousel>
                    {data.map((p, idx) =>
                        <div
                            ref={(ref) => { slideRef = ref }}
                            key={idx}
                        >
                            <img src={p.thumbnailUrl} loading="lazy" style={{ width: "35%" }}></img>
                        </div>
                    )}
                </Carousel>
            </div>


        </div>

    );
}

