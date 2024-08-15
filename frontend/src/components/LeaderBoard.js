import Difficulty from "./Difficulty";
import GameMode from "./GameMode";
import React, { useState, useEffect } from 'react';

function LeaderBoard({ difficulty, setDifficulty, gameMode, setGameMode }) {
    const [scoreBoard, setScoreBoard] = useState([]);

    useEffect(() => {
        if (difficulty && gameMode) {
            filter(difficulty, gameMode);
        }
    }, [difficulty, gameMode]);

    const handleChangeDiff = (e) => {
        const value = e.target.value;
        setDifficulty(value);
    };

    const handleChangeMode = (e) => {
        const value = e.target.value;
        setGameMode(value);
    };

    const filter = async (difficulty, gameMode) => {
        try {
            const response = await fetch('http://localhost:8000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    difficulty: difficulty,
                    gamemode: gameMode,
                    command: "display"
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const tempResponse = await response.json();
            setScoreBoard(tempResponse.leaders);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toSecond = (time) => {
        let seconds = Math.floor(time / (1000) % 60);
        let milliseconds = Math.floor((time % 1000) / 10);
        return `${seconds},${milliseconds}s`
    }

    return (
        <div>
            <label>
                <select onChange={handleChangeDiff} value={difficulty} className="labelStyle" style={{marginRight:"10px"}}>
                    <option value="Beginner">Beginner</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </label>
            <label>
                <select onChange={handleChangeMode} value={gameMode} className="labelStyle" style={{marginRight:"10px",marginBottom:"10px"}}>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>
            </label>
            {scoreBoard && scoreBoard.length > 0 && scoreBoard.map((score, scoreIndex) => (
                <div key={scoreIndex} style={{marginBottom:"5px"}}>
                    {scoreIndex + 1}. {score[0]}, Time: {toSecond(score[1])}
                </div>
            ))}
        </div>
    );
}

export default LeaderBoard;
