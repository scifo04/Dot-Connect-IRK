import React from "react";

function Username({username, setUsername}) {
    const handleChange = (e) => {
        if (e !== null && e !== undefined) {
            const value = e.target.value
            setUsername(value)
        }
    }

    return (
        <div>
            <input type="text" 
                placeholder="Username" 
                onChange={handleChange} 
                className="username"
                required/>
        </div>
    );
};

export default Username;