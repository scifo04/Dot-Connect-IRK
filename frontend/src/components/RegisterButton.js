import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./classstyle/Authorization.css"
function RegisterButton({email, password, username, setResult}) {
    const navigate = useNavigate()

    const showSuccess = () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered successfully",
          showConfirmButton: false,
          timer: 1500
        });
        
    }

    const showFailure = () => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to register",
          showConfirmButton: false,
          timer: 1500
        });
        
    }

    const handleClick = async () => {
        try {
            console.log(email,password,username);
            const response = await fetch('http://localhost:8000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                    command: "register"
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const tempResponse = await response.json();
            setResult({
                currUsername: tempResponse.currUsername,
                currApproval: tempResponse.currApproval
            })
            if (tempResponse.currApproval) {
                showSuccess()
                setTimeout(() => {
                    navigate('/game', {state: {username: tempResponse.currUsername}});
                },1500)
            } else {
                showFailure()
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <button onClick={handleClick} className="buttonAutho">Register</button>
    );
}

export default RegisterButton;