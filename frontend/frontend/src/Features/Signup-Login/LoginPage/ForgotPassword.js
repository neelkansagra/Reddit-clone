import "./../SignupLogin.css"
import React, {useContext, forwardRef, useState, useRef} from "react";
import {StatusContext, Page, emailContext} from "./../PageContext";

const ForgotPassword = forwardRef((props, ref) => {
    const {setStatus} = useContext(StatusContext);
    let [errorEmail, setErrorEmail] = useState({errorState: false, msg: ""});
    let username = useRef(""); 
    let {email, setEmailValue} = useContext(emailContext);

    let handleEmailBlur = () => {
        if(username.current.value === ""){
            setErrorEmail({errorState: true, msg: "Please fill in this field."});
        }
        else{
            setErrorEmail({errorState: false, msg: ""});
        }
    }



    return (
        <div>
            <div className='loginCross' style={{ justifyContent: "space-between" }}>
                <button className='crossBtn' onClick={() => setStatus(Page.LOGIN)}>
                    <span>
                        <svg rpl="" fill="currentColor" height="20" iconName="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
                        </svg>
                    </span>
                </button>
                <button className='crossBtn' ref = {ref.clickCross}>
                    <span>
                        <svg rpl="" fill="currentColor" height="16" icon-name="close-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z"></path>
                        </svg>
                    </span>
                </button>
            </div>
            <div className='loginMain'>
                <h1 className='loginTxt'>Reset your password</h1>
                 <p className='loginPara'>
                    Enter your email address or username and we'll send you a link to reset your password
                 </p>
            </div>
            <div className='emailPlaceholder'>
                <span className='emailLabel'>
                    Email or username*
                </span>
                <input className="emailInput" type='text' name="username" autoComplete='username' ref={username} onBlur={handleEmailBlur} defaultValue={email.current.value}></input>
                {errorEmail.errorState && <span id="helper-text" className="error">{errorEmail.msg}</span>}
            </div>
            <div className='frgtPswdwText'>
                <a style={{textDecorationLine: "none" ,fontSize: "0.875rem", lineHeight: "1.25rem", display: "inline-block", color: "#648EFC"}}>Need Help?</a>
            </div>
            <div className='loginBtn'>
                <button className='orangeLogin' disabled={errorEmail.errorState} onClick={() => {setEmailValue(username.current); setStatus(Page.CHECKEMAIL);}}>
                    Reset Password
                </button>
            </div>
        </div>
    )

});

export default ForgotPassword;