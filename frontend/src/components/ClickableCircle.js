import React, { useState, forwardRef } from "react";
import './classstyle/ClickableCircle.css'

const ClickableCircle = forwardRef(({id, onClick, currentID, gameMode, ...props}, ref) => {

    const handleClick = () => {
        const [row, col] = id.split(',').map(Number)
        console.log(gameMode)
        if (currentID) {
            if (Math.abs(currentID.row-row) === 1 && Math.abs(currentID.col-col) === 0 || Math.abs(currentID.row-row) === 0 && Math.abs(currentID.col-col) === 1) {
                onClick && onClick()
            }
        }
    };

    return (
        <div
            ref={ref}
            {...props}
            id={id}
            onClick={handleClick}
        >
        </div>
    )
});

export default ClickableCircle;