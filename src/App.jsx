import React, { useState } from 'react';
import Login from './bigProject/login';
import Home from './bigProject/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Info from './bigProject/info';
import Todos from './bigProject/todos';
import Posts from './bigProject/posts';
import Albums from './bigProject/albums';
import Post from './bigProject/post';
import Comments from './bigProject/comments';
import Album from './bigProject/album';





function App() {

    const [users, setUsers] = useState();
    let data;
    let res;

    // Fecth GET Users

    async function getUserFromServer() {
        try {
            res = await fetch('http://localhost:3500/users')
            data = await res.json();
            setUsers(data)
        } catch (error) {
            alert(error, "network error")
        }
    }

    useEffect(() => {
        getUserFromServer();
    }, [])



    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login data={users} />} />
                <Route path='/home' element={<Home />}>
                    <Route index element={<Info />} />
                    <Route path='info' element={<Info />} />
                    <Route path='todos' element={<Todos />} />
                    <Route path='posts' element={<Posts />} />
                    <Route path='posts/:postID' element={<Post />} >
                        <Route path='comments' element={<Comments />} />
                    </Route>
                    <Route path='albums' element={<Albums />} />
                    <Route path='albums/:albumID' element={<Album />} />
                    <Route path='*' element={<div><h1>This page doesn't exist</h1></div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;