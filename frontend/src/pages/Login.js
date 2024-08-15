import React, { useState, useEffect } from 'react';
import Password from '../components/Password';
import Username from '../components/Username';
import LoginButton from '../components/LoginButton';
import "./classstyle/Home.css"
import "./classstyle/Autho.css"
import DotConnPicture from "./../assets/DotConnect.ico"

const Login = () => {
    const [password, setPassword] = useState([]);
    const [username, setUsername] = useState([]);

    const [result, setResult] = useState({
        currUsername: "",
        currApproval: false
    })

    return (
        <div>
            <div className='title'>
                <img src={DotConnPicture} className='imgConn'></img>
                <h1 style={{display:"inline-block"}}>DOT-CONNECT</h1>
            </div>
            <div className='containuh'>
                <div className='register'>
                    Login
                </div>
                <Username username={username} setUsername={setUsername}/>
                <Password password={password} setPassword={setPassword}/>
                <LoginButton username={username} password={password} setResult={setResult}/>
            </div>
        </div>
    );
}

export default Login;