import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css'

// Refs



export default function Login(props) {

    let userNameRef;
    let passwordRef;

    const navigate = useNavigate()
    const users = props.data;

    //  check user

    function checkUser() {
        return users.find((user) => user.username === userNameRef.value && user.website === passwordRef.value)
    }

    // Login button

    function submitHandler(e) {
        e.preventDefault();
        const isValid = checkUser();
        if (isValid) {
            localStorage.setItem("userName", isValid.username);
            localStorage.setItem("id", isValid.id);
            localStorage.setItem("user", JSON.stringify(isValid))
            navigate('/home')
        }
        else {
            alert("You are not an authorized user")
            navigate('/')
        }


    }




    return (
        <div>
            <header>
                <h1>Login!!</h1>
            </header>
            <main>
                <form id="login_form" className="form_class" onSubmit={(e) => submitHandler(e)}>
                    <div className="form_div">
                        <label name='userName'>Enter your user name</label>
                        <input className="field_class" ref={(input) => { userNameRef = input }} type="text" placeholder='UserName' name='userName' />

                        <label name='userPassword'>Enter your password</label>
                        <input id="pass" className="field_class" ref={(input) => { passwordRef = input }} type="password" />

                        <button className="submit_class" type='submit'>Login </button>
                    </div>
                </form>
            </main>
            <footer>
                <p> Ⓒ Created by ET & IS</p>
            </footer>


        </div>
    );
}

