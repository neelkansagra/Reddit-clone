import './LoginPage.css'
import React, { forwardRef, useState } from 'react';

const LoginPage = forwardRef((props, ref) =>{
    const [LoginPage, setLoginPage] = useState(true);
    const [SignupPage, setSignupPage] = useState(false);
    const handleClick = (event) =>{
        setLoginPage(!LoginPage);
    }

    const eventDecider = (event) =>{
            if(event.target.textContent ==="Log In"){

            }
            else if(event.target.textContent ==="Continue"){
                    setSignupPage(true);
            }
    }

    const goBack = (event) =>{
        setSignupPage(false)
    }
    return (
        <div className='loginPage'>
            <div className='loginBar' ref = {ref.clickOutside}>
                {SignupPage ? (<div className='backBtn'> 
                    <button className='crossBtn' onClick={goBack}>
                        <span>
                        <svg rpl="" fill="currentColor" height="20" iconName="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
    </svg>
                        </span>
                    </button>
                </div>) :(<div className='loginCross'>
                    <button className='crossBtn' ref = {ref.clickCross}>
                        <span>
                            <svg rpl="" fill="currentColor" height="16" icon-name="close-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
                            </svg>
                        </span>
                    </button>
                </div>)}
                <div className='loginMain'>
                    <h1 className='loginTxt'>{LoginPage ? "Log In": (SignupPage ? "Create your username and password":"Sign Up")}</h1>
                    {(LoginPage || (!LoginPage && !SignupPage)) ? (<p className='loginPara'>
                        By continuing, you agree to our<a target="_blank" href="">User Agreement</a> and acknowledge that you understand the <a target="_blank" href="">Privacy Policy</a>.</p>):
                        (<p className='loginPara'>
                        Reddit is anonymous, so your username is what you'll go by here. Choose wisely--because once you get a name, you can't change it.</p>)
                        }
                </div>
                {<div className='emailPlaceholder'>
                    <span className='emailLabel'>
                        {LoginPage? "Email or username*" : (SignupPage? "Username":"Email")}
                    </span>
                    <input className="emailInput" type='text' name="username" autoComplete='username'></input>
                </div>}
                {(LoginPage || (!LoginPage && SignupPage)) && <div className='PswdPlaceholder'>
                    <span className='emailLabel'>
                        Password*
                    </span>
                    <input className="emailInput" type='password' name="password" required autoComplete='password'></input>
                </div>}
                {LoginPage && <div className='frgtPswdwText'>
                    <a style={{textDecorationLine: "none" ,fontSize: "0.875rem", lineHeight: "1.25rem", display: "inline-block", color: "#648EFC"}}>Forgot password?</a>
                </div>}
                {!SignupPage && <div className='signupAnchor' onClick={handleClick}>
                    <div>{LoginPage ? "New to Reddit?":"Already a Redditor?"} <a style={{textDecorationLine: "none" ,fontSize: "0.875rem", lineHeight: "1.25rem", display: "inline-block", color: "#648EFC"}}> {LoginPage ? "Sign Up":"Log In"}</a></div>
                </div>}
                <div className={LoginPage ? 'loginBtn':(SignupPage ? "loginBtn":'signupBtn')}>
                    <button className='orangeLogin' onClick = {eventDecider}>
                        {LoginPage ? "Log In":(SignupPage ? "Sign Up": "Continue")}
                    </button>

                </div>
            </div>

        </div>
    )
});

export default LoginPage;