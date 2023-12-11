import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './css/home.css'
import infoPic from './photos/profile.png';
import postsPic from './photos/blogging.png';
import todosPic from './photos/to-do-list.png';
import albumPic from './photos/picture.png';

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) {
    return navigate('/')
  }

  // LogOut 

  function logOut() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <header>
        <div style={{ width: "100%" }}>
          <h1>Hello {user.name} Welcome!! </h1>
          
        </div>
      </header>
      <div style={{ display: "flex" }}>
        <nav>
          <button className='btnHome' onClick={logOut} >LogOut</button>
          <Link to='info'>
            <div className='link' ><img src={infoPic}  style={{width:"50%",height:"auto"}}/></div>
          </Link>
          <Link to='todos'>
            <div className='link' ><img src={todosPic} style={{width:"50%",height:"auto"}} /></div>
          </Link>
          <Link to='posts'>
            <div className='link' ><img src={postsPic} style={{width:"50%",height:"auto"}} /></div>
          </Link>
          <Link to='albums'>
            <div className='link' ><img src={albumPic} style={{width:"50%",height:"auto"}} /></div>
          </Link>
        </nav>
        <Outlet />
      </div>
</div>

  );
}

