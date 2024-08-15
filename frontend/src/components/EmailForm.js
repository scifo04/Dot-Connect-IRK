import React, { useState } from "react";
import "./classstyle/Authorization.css"

function EmailForm({email, setEmail}) {
    const handleChange = (e) => {
        if (e !== null && e !== undefined) {
            const value = e.target.value
            setEmail(value)
        }
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Email"
                onChange={handleChange}
                className="emailForm"
                required/>
        </div>
    );
};

export default EmailForm;