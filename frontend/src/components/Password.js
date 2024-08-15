import React from "react";

function Password({password, setPassword}) {
    const handleChange = (e) => {
        if (e !== null && e !== undefined) {
            const value = e.target.value
            setPassword(value)
        }
    }

    return (
        <div>
            <input type="text" 
                placeholder="Password"
                onChange={handleChange} 
                className="password"
                required/>
        </div>
    );
};

export default Password;