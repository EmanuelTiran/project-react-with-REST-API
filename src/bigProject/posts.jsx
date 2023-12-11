import React from 'react';
import { useEffect, useState } from 'react';
import { Link   } from 'react-router-dom';
import postPic from './photos/sticky-notes.png';
import './css/posts.css';

export default function Posts() {
    const [data, setData] = useState([]);
    
// Get userID
let userID = localStorage.getItem("id")

    // Get posts
    let res;
    let getData;

    async function getPosts() {
      try{
        res = await fetch(`http://localhost:3500/users/${userID}/posts`)
        getData = await res.json();
        setData(getData)
      }catch (error) {
        alert(error, "network error")
    }
        
    }
    useEffect(() => {
        getPosts();
    }, [userID])

    return (
        <div className='body'>
            <div><h1>My Posts</h1></div>
            <div>
                
                    {data.map((item, idx) => 
                     <Link
                     to={`${item.id}` }
                     key={idx} >
                     <div className='postDiv'>
                        <div className='postImg'>
                          <img src={postPic} style={{width:"125%", height:"auto"}} />
                        </div>
                        <div className='postTitle'>
                            {item.title}
                        </div>
                     </div>
                   
                        
                        </Link>
                    )}
                
                
            </div>
            <br /><br /><br />
        </div>
    );
}