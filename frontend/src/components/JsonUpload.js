import React, { useState } from 'react';

function JsonUpload({arrayOfArrays, setArrayOfArrays, setCreate}) {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    if (json && json.board && Array.isArray(json.board) && json.board.every(item => Array.isArray(item) && item.every(Number.isInteger))) {
                        setArrayOfArrays(json.board);
                    } else {
                        alert('Invalid JSON format. Expected an array of arrays of integers.');
                    }
                } catch (err) {
                    alert('Failed to parse JSON file.');
                }
            };

            reader.readAsText(file);
        }
    };

    return (
        <div>
            <input type="file" accept=".json" onChange={handleFileUpload} style={{marginLeft:"80px"}}/>
        </div>
    );
}

export default JsonUpload;