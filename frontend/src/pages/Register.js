import React, { useState, useEffect } from 'react';
import EmailForm from '../components/EmailForm';
import Password from '../components/Password';
import Username from '../components/Username';
import RegisterButton from '../components/RegisterButton';
import "./classstyle/Home.css"
import "./classstyle/Autho.css"
import DotConnPicture from "./../assets/DotConnect.ico"

const Register = () => {
    const [email, setEmail] = useState([]);
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
                    Register
                </div>
                <EmailForm email={email} setEmail={setEmail}/>
                <Password password={password} setPassword={setPassword}/>
                <Username username={username} setUsername={setUsername}/>
                <RegisterButton username={username} password={password} email={email} setResult={setResult}/>
            </div>
        </div>
    );
}

export default Register;