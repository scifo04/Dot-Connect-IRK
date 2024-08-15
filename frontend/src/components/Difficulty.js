import React, { useState } from "react";
import "./classstyle/Label.css"

function Difficulty({setDifficulty, setCreate, setIsRunning, setElapsedTime}) {
    const handleChange = (e) => {
        if (e !== null && e !== undefined) {
            const value = e.target.value
            setDifficulty(value)
            setCreate(false)
            setIsRunning(false)
            setElapsedTime(0)
        }
    }

    return (
        <div>
            <label>
                Difficulty: <select onChange={handleChange} className="labelStyle">
                    <option value="Beginner">Beginner</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </label>
        </div>
    );
};

export default Difficulty;