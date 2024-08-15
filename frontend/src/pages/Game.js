import React, { useState, useEffect, useRef } from 'react';
import Difficulty from '../components/Difficulty';
import JsonUpload from '../components/JsonUpload';
import ClickableCircle from '../components/ClickableCircle';
import DotConnect from '../components/DotConnect';
import GameMode from '../components/GameMode';
import Square from '../components/Square';
import Stopwatch from '../components/Stopwatch';
import { useLocation } from 'react-router-dom';
import LeaderBoard from '../components/LeaderBoard';
import DotConnPicture from "./../assets/DotConnect.ico"
import "./classstyle/Autho.css"
import "./classstyle/Home.css"
import OnOff from '../components/OnOff';

const Game = () => {
    const location = useLocation();
    const [difficulty, setDifficulty] = useState("Beginner")
    const [gameMode, setGameMode] = useState("Manual")
    const [arrayOfArrays, setArrayOfArrays] = useState([])
    const [generateOrCustom, setGenerateOrCustom] = useState(false)
    const [create, setCreate] = useState(false)
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTimeRef = useRef(0);
    const [actualTime, setActualTime] = useState(0);
    const [leadDiff, setLeadDiff] = useState("Beginner");
    const [leadMode, setLeadMode] = useState("Manual");
    const {username} = location.state || {};

    const getDimensions = () => {
        switch (difficulty) {
          case 'Beginner':
            return { height: 5, width: 5 };
          case 'Easy':
            return { height: 8, width: 6 };
          case 'Medium':
            return { height: 10, width: 6 };
          case 'Hard':
            return { height: 12, width: 8 };
          default:
            return { height: 5, width: 5 };
        }
    };
    
    const { height, width } = getDimensions();

    const handleClick = () => {
        if (generateOrCustom || (!generateOrCustom && arrayOfArrays.length == getDimensions().height && arrayOfArrays[0].length == getDimensions().width)) {
            setCreate(true);
            setIsRunning(true);
            setElapsedTime(0);
            setActualTime(Date.now())
            startTimeRef.current = Date.now();
        } else {
            alert('Invalid Size. Please insert JSON according to the difficulty');
        }
    }

    const clear = () => {
        setCreate(false);
        setIsRunning(false);
        setElapsedTime(0);
        startTimeRef.current = Date.now();
    }

    return (
        <div>
            <div className='title'>
                <img src={DotConnPicture} className='imgConn'></img>
                <h1 style={{display:"inline-block"}}>DOT-CONNECT</h1>
            </div>
            <div>
                <div>
                    <div className='gamesetup'>
                        <div className='game'>
                            Welcome {username}
                        </div>
                        <Difficulty setDifficulty={setDifficulty} setCreate={setCreate} setIsRunning={setIsRunning} setElapsedTime={setElapsedTime}/>
                        <GameMode setGameMode={setGameMode} setCreate={setCreate} setIsRunning={setIsRunning} setElapsedTime={setElapsedTime}/>
                        <OnOff isOn={generateOrCustom} setIsOn={setGenerateOrCustom}></OnOff>
                        
                        <div style={{marginTop:'8px'}}>
                        { !generateOrCustom && (
                            <div>
                                <JsonUpload arrayOfArrays={arrayOfArrays} setArrayOfArrays={setArrayOfArrays} setCreate={setCreate}/>
                                <button onClick={handleClick} className='playButton'>Create</button>
                                <button onClick={clear} className='playButton'>Clear</button>
                            </div>
                        )}
                        </div>

                        <div>
                            { generateOrCustom && (
                                <div>
                                    <button onClick={handleClick} className='playButton'>Generate</button>
                                    <button onClick={clear} className='playButton'>Clear</button>
                                </div>
                            ) }
                        </div>
                    </div>

                    <div className='watchsetup'>
                        <Stopwatch elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} isRunning={isRunning} setIsRunning={setIsRunning} startTimeRef={startTimeRef}/>
                    </div>

                    <div className='leadersetup'>
                        <LeaderBoard difficulty={leadDiff} setDifficulty={setLeadDiff} gameMode={leadMode} setGameMode={setLeadMode}/>
                    </div>
                </div>
                <div className='parent-container'>
                    <div className='dotConnect' style={{height:`${getDimensions().height*120}`,width:`${getDimensions().width*120}`}}>
                        { create && (<DotConnect height={height} 
                                                width={width} 
                                                arraye={arrayOfArrays} 
                                                generateOrCustom={generateOrCustom} 
                                                elapsedTime={elapsedTime} 
                                                setIsRunning={setIsRunning}
                                                gameMode={gameMode}
                                                difficulty={difficulty}
                                                username={username}
                                                setActualTime={setActualTime}
                                                actualTime={actualTime}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;