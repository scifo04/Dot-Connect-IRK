import React, { useState, useEffect, useRef } from 'react';

function Stopwatch({ elapsedTime, setElapsedTime, isRunning, setIsRunning, startTimeRef }) {
    const intervalIdRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning, setElapsedTime]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
        startTimeRef.current = Date.now(); // Reset the start time
    }

    function format() {
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / 1000 % 60);
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    return (
        <div style={{fontSize:"25px"}}>
            {format()}
        </div>
    );
}

export default Stopwatch;
