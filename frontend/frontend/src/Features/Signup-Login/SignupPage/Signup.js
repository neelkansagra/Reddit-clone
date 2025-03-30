import './../SignupLogin.css'
import React, { forwardRef, useContext, useState, useRef } from 'react';
import { StatusContext, Page, emailContext } from './../PageContext';
import GoogleLoginButton from '../GoogleLoginButton';

const Signup = forwardRef((props, ref) =>{
    let {setStatus } = useContext(StatusContext);
    let {email, setEmailValue} = useContext(emailContext);
    let emailRef = useRef("");
    let [buttonState, usebuttonState] = useState(true);
    let [errorEmail, setErrorEmail] = useState({errorState: false, msg: ""});
    
    let handleBlur = (event) => {
        if(!event.target.value.includes("@")){
            setErrorEmail({errorState: true, msg: "Please include an '@' in the email address. '"+event.target.value+"' is missing an '@'."});
        }
        else{
            setErrorEmail({errorState: false, msg: ""});
        }
    }
    let handleContinue = () => {
        if(emailRef.current.value.includes("@")){
            usebuttonState(false);
        }
        else{
            usebuttonState(true);
        }
    }

    let onClickContinue = () => {
        setEmailValue(emailRef.current);
        setStatus(Page.CONTINUE);
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
                <h1 className='loginTxt'>Sign Up</h1>
                <p className='loginPara'>
                    By continuing, you agree to our<a target="_blank" href="">User Agreement</a> and acknowledge that you understand the <a target="_blank" href="">Privacy Policy</a>.
                </p>
            </div>
            <GoogleLoginButton />
            <div className='emailPlaceholder'>
                <span className='emailLabel'>
                    Email
                </span>
                <input className="emailInput" type='text' name="username" autoComplete='username' onBlur={handleBlur} onChange={handleContinue} ref={emailRef} defaultValue={email.current.value}></input>
                {errorEmail.errorState && <span id="helper-text" className="error">{errorEmail.msg}</span>}
            </div>
            <div className='signupAnchor' onClick={() => setStatus(Page.LOGIN)}>
                <div>Already a Redditor? <a style={{textDecorationLine: "none" ,fontSize: "0.875rem", lineHeight: "1.25rem", display: "inline-block", color: "#648EFC"}}>Log In</a>
                </div>
            </div>
            <div className='signupBtn'>
                <button className='orangeLogin' disabled = {buttonState} onClick = {onClickContinue}>
                    Continue
                </button>
            </div>
        </div>
    )
});

export default Signup;