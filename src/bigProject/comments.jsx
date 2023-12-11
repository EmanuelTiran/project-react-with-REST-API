import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import comentsPic from './photos/comments.png';
import emailPic from './photos/email.png';
import './css/comment.css'


export default function Comments() {

    // Get id!!
    let { postID } = useParams()

    //  Get comments!!
    const [data, setData] = useState([]);
    let location = useLocation()
    let res;
    let getData;

    async function getComments() {
      try{
        res = await fetch(`http://localhost:3500/posts/${postID}/comments`);
        getData = await res.json();
        setData(getData);
      } catch (error) {
        alert(error, "network error")
    } 
    }
    useEffect(() => {

        getComments()
    }, [])

    return (
        <div style={{margin:"auto",width:"95%"}}>
            {data.map((comment, idx) =>
            <div className='comment'>
                <div className='imgCom'>
                    <img src={comentsPic} style={{width:"75%"}} />
                </div>
                <div className='bodyCom'>
                    <p style={{textTransform:"capitalize"}}>{comment.name}</p>
                    <p>{comment.body}</p>
                    <div style={{width:"500px"}}>
                    <img src={emailPic} style={{ width: "5%" }} />
                    {comment.email}
                </div>
                </div>
            </div>
                
            )}
        </div>
    );
}

