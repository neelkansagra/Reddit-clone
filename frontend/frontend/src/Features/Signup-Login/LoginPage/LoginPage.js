import './../SignupLogin.css'
import React, { forwardRef, useContext, useRef, useState } from 'react';
import { StatusContext, Page } from './../PageContext';
import axios from 'axios';

const LoginPage = forwardRef((props, ref) =>{
    let { status, setStatus } = useContext(StatusContext);
    let [errorEmail, setErrorEmail] = useState({errorState: false, msg: ""});
    let [errorPassword, setErrorPassword] = useState({errorState: false, msg: ""});

    let username = useRef("");
    let password = useRef("");

    let onEmailChange = (event) => {
        if(event.target.value === ""){
            setErrorEmail({errorState: true, msg: "Please fill in this field."});
        }
        else{
            setErrorEmail({errorState: false, msg: ""});
        }
    }
    let onPasswordChange = (event) => {
        if(event.target.value === ""){
            setErrorPassword({errorState: true, msg: "Please fill in this field."});
        }
        else{
            setErrorPassword({errorState: false, msg: ""});
        }
        
    }
    let handleSubmit = () => {
        console.log(username.current.value);
        console.log(password.current.value);
        
        axios.post("/login", {"email" : username.current.value, "password": password.current.value})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <div>
            <div className='loginCross'>
                <button className='crossBtn' ref = {ref.clickCross}>
                    <span>
                        <svg rpl="" fill="currentColor" height="16" icon-name="close-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
                        </svg>
                    </span>
                </button>
            </div>
            <div className='loginMain'>
                <h1 className='loginTxt'>Log In</h1>
                 <p className='loginPara'>
                    By continuing, you agree to our<a target="_blank" href="">User Agreement</a> and acknowledge that you understand the <a target="_blank" href="">Privacy Policy</a>.
                 </p>
            </div>
            <div className='emailPlaceholder'>
                    <span className='emailLabel'>
                        Email or username*
                    </span>
                    <input className="emailInput" type='text' name="username" autoComplete='username' onBlur = {onEmailChange} onFocus={() => setErrorEmail({errorState: false, msg: ""})} ref={username}></input>
                    {errorEmail.errorState && <span id="helper-text" className="error">{errorEmail.msg}</span>}
            </div>
                <div className='PswdPlaceholder'>
                    <span className='emailLabel'>
                        Password*
                    </span>
                    <input className="emailInput" type='password' name="password" required autoComplete='password' onBlur={onPasswordChange} onFocus={() => setErrorPassword({errorState: false, msg: ""})} ref={password}></input>
                    {errorPassword.errorState && <span id="helper-text" className="error">{errorPassword.msg}</span>}
                </div>
            <div className='frgtPswdwText'>
                    <a style={{textDecorationLine: "none" ,fontSize: "0.875rem", lineHeight: "1.25rem", display: "inline-block", color: "#648EFC"}} onClick= {() => setStatus(Page.FORGOTPASSWORD)}>Forgot password?</a>
            </div>
            <div className='signupAnchor'>
                <div>New to Reddit? <a style={{textDecorationLine: "none" ,fontSize: "0.875rem", lineHeight: "1.25rem", display: "inline-block", color: "#648EFC"}} onClick={() => setStatus(Page.SIGNUP)} > Sign Up</a></div>
            </div>
            <div className='loginBtn'>
                <button className='orangeLogin' onClick={handleSubmit}>
                    Log In
                </button>
            </div>
        </div>
    )
});

export default LoginPage;