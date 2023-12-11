import React from 'react';
import './css/info.css'
import idPic from './photos/id-card.png';
import mailPic from './photos/email.png';
import webPic from './photos/web.png';
import callingPic from './photos/calling.png';
import adressPic from './photos/location-pin.png';
import workPic from './photos/office-building.png';




export default function Info() {
    const data = JSON.parse(localStorage.getItem("user"));
    let userData
    let userAddress
    let userCompany
    let userGeo

    // GET info
    function getData(obj) {
    
        return Object.entries(obj)
            .filter((e) => typeof e[1] === 'string')
            .map(([key, value], idx) => <span key={idx}>{value}</span>);
            
    }

    try {
        userData = getData(data)
        userAddress = getData(data.address)
        userCompany = getData(data.company)
        userGeo = getData(data.address.geo)
    } catch (error) {
        console.log(error);
    }

    return (
        <div className='body'>
            <h1>Info</h1>
            <div className='info'>
                <img src={idPic} style={{ width: "50%" }} />
                <p className='name'>{userData[0]}</p>
                <div className="textInfo">
                    <img src={adressPic} style={{ width: "10%" }} />
                    {userAddress[0]} st, <br /><span style={{ marginLeft: "25px" }}>{userAddress[2]}.</span>
                </div>
                <div className="textInfo">
                    <img src={workPic} style={{ width: "10%" }} />
                    {userCompany[0]}
                </div>
                <div className="textInfo">
                    <img src={webPic} style={{ width: "10%" }} />
                    {userData[4]}
                </div>
                <div className="textInfo">
                    <img src={callingPic} style={{ width: "10%" }} />
                    {userData[3]}
                </div>
                <div className="textInfo">
                    <img src={mailPic} style={{ width: "10%" }} />
                    {userData[2]}
                </div>
            </div>
        </div>
    );
}


