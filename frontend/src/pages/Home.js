import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import "./classstyle/Home.css"
import { useNavigate } from "react-router-dom";
import DotConnPicture from "./../assets/DotConnect.ico"

const Home = () => {
    const navigate = useNavigate();

    const goToRegister = () => {
        navigate('/register');
    }

    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            <div className='title'>
                <img src={DotConnPicture} className='imgConn'></img>
                <h1 style={{display:"inline-block"}}>DOT-CONNECT</h1>
            </div>
            <div className='firstInfo'>
                <div>
                    <h2>Welcome to Dot-Connect. Please click new game to start a new game and load game to load your played game</h2>
                </div>
                <div>
                    <button className='styleButton' onClick={goToRegister}>New Game</button>
                    <button className='styleButton' onClick={goToLogin}>Load Game</button>
                </div>
            </div>
        </div>
    );
}

export default Home;