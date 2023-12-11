import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import arrowPic from './photos/left-arrow.png';
import postPic from './photos/sticky-notes 2.png';
import commentPic from './photos/comments.png';
import mailPic from './photos/email.png';
import './css/post.css'


export default function Post() {

    //    Get postID

    let { postID } = useParams()

    // Get post
    const [data, setData] = useState([])
    let res;
    let getData;
    async function getPost() {
      try{
        res = await fetch(`http://localhost:3500/posts/${postID}`);
        getData = await res.json();
        setData(getData);
      } catch (error) {
        alert(error, "network error")
    } 
    }
    useEffect(() => {
        getPost()
    }, [])

    

    const navigate = useNavigate();

// Onclick Comments
    function OnclickCommentsHandler() {

        navigate('comments', { state: { postID: postID } })
    }
    return (
        <div style={{width:"1400px", margin:"auto"}}>
            <div className='back'>
                <Link to={"/home/posts"}>
            <img src={arrowPic} style={{width:"100%", height:"auto"}} />
            </Link>
            
            </div>
            
            
                <div className='imgPost'>
                <img src={postPic} style={{width:"100%", height:"auto"}} />
                </div>
            <div className='title'>{data.title}</div>
            
            <div className='bodyPost'>
                {data.body}
            </div>
            
            <div style={{width:"150px", margin:"auto",marginTop:"80px"}}>
                <button className='btnPost' onClick={OnclickCommentsHandler}>View Comments</button>

            </div>
            <div>

            </div>
            <Outlet />
        </div>
    );
}

