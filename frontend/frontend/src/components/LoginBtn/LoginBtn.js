import { useState } from 'react';
import './LoginBtn.css'

const LoginBtn = ({Click}) => {
   
    return (
        <span className="LogInBtn">
            <a className="LogInLink" onClick={Click}>
                <span className="LogInText" >
                    Log In
                </span>
        
            </a>
        </span>
    )
};
export default LoginBtn;