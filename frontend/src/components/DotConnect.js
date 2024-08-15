import React, { useState, useEffect } from "react";
import ClickableCircle from "./ClickableCircle";
import Swal from "sweetalert2";
import Square from "./Square";
import './classstyle/DrawLine.css'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function DotConnect({ height, width, arraye, generateOrCustom, elapsedTime, setIsRunning, gameMode, difficulty, username, setActualTime, actualTime }) {
    const [currentID, setCurrentID] = useState(null);
    const [previousID, setPreviousID] = useState(null);
    const [grid, setGrid] = useState([]);
    const [connections, setConnections] = useState([]);
    const [path, setPath] = useState([]);
    const [requiredDot, setRequiredDot] = useState(0);
    const [gottenDot, setGottenDot] = useState(0);
    const [isWin, setIsWin] = useState(false);

    const showSuccess = () => {
        const finalTime = Date.now() - actualTime
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Dot Connect completed in ${getTime(finalTime)}`,
          showConfirmButton: false,
          timer: 1500
        });
        
    }

    useEffect(() => {
        setRequiredDot(0);
        setGottenDot(0);
        if (generateOrCustom) {
            const createMappedMatrix = (row, col) => {
                const mappedID = [];
                let countArrayDot = 0;
                for (let i = 0; i < row; i++) {
                    const rows = [];
                    for (let j = 0; j < col; j++) {
                        const num = Math.random();
                        if (num < 0.80) {
                            rows.push(0);
                            countArrayDot++;
                        } else {
                            rows.push(1);
                        }
                    }
                    mappedID.push(rows);
                }
                const intA = getRandomInt(0, row);
                const intB = getRandomInt(0, col);
                if (mappedID[intA][intB] == 0) {
                    countArrayDot--;
                }
                mappedID[intA][intB] = 2;
                setCurrentID({ row: intA, col: intB });
                setRequiredDot(countArrayDot);
                return mappedID;
            };
            
            setGrid(createMappedMatrix(height, width));
        } else {
            if (arraye.length === height && arraye[0].length === width) {
                setGrid(arraye);
                let countArrayDot = 0;
                for (let i = 0; i < arraye.length; i++) {
                    for (let j = 0; j < arraye[i].length; j++) {
                        if (arraye[i][j] == 0) {
                            countArrayDot++;
                        }
                    }
                }
                const current = getFirstID(arraye);
                if (current) {
                    setCurrentID(current);
                    setRequiredDot(countArrayDot);
                }
            } else {
                alert('Invalid Size. Please insert JSON according to the difficulty');
            }
        }
    }, [width, height, arraye]);

    const storeLeaderboard = async (finalTime) => {
        console.log(elapsedTime)
        if (true) {
            try {
                const response = await fetch('http://localhost:8000', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        time: gameMode === "Automatic" ? finalTime : elapsedTime,
                        difficulty: difficulty,
                        gamemode: gameMode,
                        command: "store"
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log("Victory data stored")
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    useEffect(() => {
        const updateConnections = async () => {
            if (path) {
                if (path.length > 0) {
                    const tempConnections = [];
                    let previousPos = currentID;

                    for (let i = 0; i < path.length; i++) {
                        const nextPos = { row: path[i][0], col: path[i][1] };

                        updateCell(nextPos.row, nextPos.col, 2);
                        if (previousPos) {
                            tempConnections.push({ from: previousPos, to: nextPos });
                        }
                        previousPos = nextPos;

                        setConnections(tempConnections);
                        await new Promise((resolve) => setTimeout(resolve, 100));
                    }
                    const finalTime = Date.now() - actualTime
                    setIsWin(true);
                    setIsRunning(false);
                    showSuccess();
                    storeLeaderboard(finalTime);
                }
            }
        };

        updateConnections();
    }, [path, currentID]);

    const solve = async (arraye) => {
        try {
            const response = await fetch('http://localhost:8000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    arraye: arraye,
                    command: "solve"
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const tempResponse = await response.json();
            setPath(tempResponse.path);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getFirstID = (arraye) => {
        for (let i = 0; i < arraye.length; i++) {
            for (let j = 0; j < arraye[i].length; j++) {
                if (arraye[i][j] === 2) {
                    return { row: i, col: j };
                }
            }
        }
        return null;
    }

    const updateCell = (row, col, newValue) => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((r, rIndex) =>
                r.map((cell, cIndex) => {
                    if (rIndex === row && cIndex === col) {
                        return newValue;
                    }
                    return cell;
                })
            );
            return newGrid;
        });
    };

    const getShape = (int, id) => {
        const handleClick = () => {
            if (gameMode === "Manual") {
                updateCell(id.row, id.col, 2);
                setPreviousID(currentID);
                setCurrentID(id);
                setGottenDot(gottenDot+1);
                const finalTime = elapsedTime
                console.log(requiredDot, gottenDot)
                if ((gottenDot === requiredDot-1 && !generateOrCustom) || (gottenDot === requiredDot-1 && generateOrCustom)) {
                    setIsWin(true);
                    setIsRunning(false);
                    showSuccess();
                    storeLeaderboard(finalTime);
                }
                if (currentID) {
                    setConnections((prev) => [...prev, { from: currentID, to: id }]);
                }
            }
        };

        if (int === 0) {
            return <ClickableCircle id={`${id.row},${id.col}`} className="circle" onClick={handleClick} currentID={currentID} gameMode={gameMode} />;
        } else if (int === 1) {
            return <Square />;
        } else if (int === 2) {
            return <ClickableCircle id={`${id.row},${id.col}`} className="circle clicked" />;
        }
    };

    const drawLines = () => {
        const containerRect = document.querySelector('.dotConnect').getBoundingClientRect();
    
        return connections.map((connection, index) => {
            const { from, to } = connection;
    
            const fromCircle = document.querySelector(`[id="${from.row},${from.col}"]`);
            const toCircle = document.querySelector(`[id="${to.row},${to.col}"]`);
    
            if (fromCircle && toCircle) {
                const fromRect = fromCircle.getBoundingClientRect();
                const toRect = toCircle.getBoundingClientRect();
    
                // Calculate line start and end positions relative to the container
                const x1 = fromRect.left - containerRect.left + fromRect.width / 2;
                const y1 = fromRect.top - containerRect.top + fromRect.height / 2;
                const x2 = toRect.left - containerRect.left + toRect.width / 2;
                const y2 = toRect.top - containerRect.top + toRect.height / 2;

                const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    
                return (
                    <line
                        key={index}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgb(0,255,0)"
                        strokeWidth="6"
                        strokeDasharray={length}
                        strokeDashoffset={length}
                        style={{ animation: "drawLine 1s linear forwards" }}
                    />
                );
            }
            return null;
        });
    };

    const getTime = (time) => {
        let seconds = Math.floor(time / (1000) % 60);
        let milliseconds = Math.floor((time % 1000) / 10);
        return `${seconds},${milliseconds}s`
    }

    const Game = grid.map((row, rowIndex) => (
        <div key={rowIndex}>
            {row.map((element, elementIndex) => (
                <div key={elementIndex} style={{ display: "inline-block" }}>
                    {getShape(element, { row: rowIndex, col: elementIndex })}
                </div>
            ))}
        </div>
    ));

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', alignItems:"center", justifyContent:"center" }}>
            {gameMode === "Automatic" && (<button onClick={() => solve(grid)} className="buttonAutho">Solve</button>)}
            {Game}
            <svg className="lines" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: '-1', pointerEvents: 'none', marginLeft:"-25px", marginTop:"-25px" }}>
                {drawLines()}
            </svg>
        </div>
    );
}

export default DotConnect;
