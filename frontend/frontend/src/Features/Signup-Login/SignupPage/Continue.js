import './../SignupLogin.css'
import React, { useContext, useState, useEffect, useRef } from 'react';
import { StatusContext, Page, emailContext} from '../PageContext';
import { use } from 'react';

const usernameEnum = {
    default: 'default',
    approved: 'approved',
    exists: 'exists',
    invalid: 'invalid',
    notfilled: 'notfilled'
}
const passwordEnum = {
    default: 'default',
    invalid: 'invalid',
    notfilled: 'notfilled'
}
const Continue = () =>{
    const { setStatus } = useContext(StatusContext);
    const { email } = useContext(emailContext);
    const [usernameError, setUsernameState] = useState(usernameEnum.default);
    const [passwordError, setPasswordState] = useState(passwordEnum.default);
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [disabled, setDisabled] = useState(true);

    let handlePasswordChange = () => {
        if(passwordRef.current.value.length < 8){
            setPasswordState(passwordEnum.invalid);
        }
        else if(passwordRef.current.value === ""){
            setPasswordState(passwordEnum.notfilled);
        }
        else{
            setPasswordState(passwordEnum.default);
        }
    }

    let handleEmailChange = () => {
        if(usernameRef.current.value.match("/[a-zA-Z0-9_-]+/")){
            setUsernameState(usernameEnum.invalid);
        }
        else if(usernameRef.current.value === ""){
            setUsernameState(usernameEnum.notfilled);
        }
        else{
            setUsernameState(usernameEnum.approved);
        }
    }
    const userNameState = (arg) => {
        switch (arg){
            case usernameEnum.default:
                return;
            case usernameEnum.approved:
                return <span id="helper-text" className="error">Nice! Username available</span>;
            case usernameEnum.exists:
                return <span id="helper-text" className="error">That username is already taken</span>;
            case usernameEnum.invalid:
                return <span id="helper-text" className="error">username can only contain letters, numbers, "-", and "_"</span>;
            case usernameEnum.notfilled:
                return <span id="helper-text" className="error">Please fill in this field</span>;
        }
    }
    let passwordState = (arg) => {
        switch (arg){
            case passwordEnum.default:
                return;
            case passwordEnum.invalid:
                return <span id="helper-text" className="error">{"Please lengthen this text to 8 characters or more (you are currently using "+ passwordRef.current.value.length +" characters)"}</span>;
            case passwordEnum.notfilled:
                return <span id="helper-text" className="error">Please fill in this field</span>;
        }
    }

    useEffect(() => {
        if((usernameError === usernameEnum.approved || usernameError === usernameEnum.default) && passwordError === passwordEnum.default){
            setDisabled(false);
        }
        else{
            setDisabled(true);
        }
    }
    ,[usernameError, passwordError]);

    let postHandler = () => {
        console.log(email.current.value);
        console.log(usernameRef.current.value);
        console.log(passwordRef.current.value);
        console.log("Post Handler");
    }
    return (
        <div>
            <div className='backBtn'> 
                <button className='crossBtn' onClick={() => setStatus(Page.SIGNUP)}>
                    <span>
                        <svg rpl="" fill="currentColor" height="20" iconName="back-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
                        </svg>
                    </span>
                </button>
            </div>
            <div className='loginMain'>
                <h1 className='loginTxt'>Create your username and password</h1>
                    <p className='loginPara'>
                        Reddit is anonymous, so your username is what you'll go by here. Choose wisely--because once you get a name, you can't change it.
                    </p>
            </div>
                <div className='emailPlaceholder'>
                    <span className='emailLabel'>
                        Username
                    </span>
                    <input className="emailInput" type='text' name="username" autoComplete='username' onBlur={handleEmailChange} onFocus={() => setUsernameState(usernameEnum.default)} ref = {usernameRef}></input>
                    {userNameState(usernameError)}
                </div>
                <div className='PswdPlaceholder'>
                    <span className='emailLabel'>
                        Password*
                    </span>
                    <input className="emailInput" type='password' name="password" required autoComplete='password' onBlur={handlePasswordChange} onFocus={() => setPasswordState(passwordEnum.default)} ref = {passwordRef}></input>
                    {passwordState(passwordError)}
                </div>
                <div className='loginBtn'>
                    <button className='orangeLogin' disabled={disabled? true : false} onClick={postHandler}>
                        Sign Up
                    </button>
                </div>

        </div>
    )
};

export default Continue;