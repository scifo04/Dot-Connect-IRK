import React, { useState } from "react";
import "./classstyle/Label.css"

function GameMode({setGameMode, setCreate, setIsRunning, setElapsedTime}) {
    const handleChange = (e) => {
        if (e !== null && e !== undefined) {
            const value = e.target.value
            setGameMode(value)
            setCreate(false)
            setIsRunning(false)
            setElapsedTime(0)
        }
    }

    return (
        <div>
            <label>
                Select Game mode: <select onChange={handleChange} className="labelStyle">
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>
            </label>
        </div>
    );
};

export default GameMode;