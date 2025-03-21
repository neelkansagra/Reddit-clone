import './SignupLogin.css'
import React, { forwardRef, useContext, useState, useRef } from 'react';
import LoginPage from './LoginPage/LoginPage';
import Signup from './SignupPage/Signup';
import Continue from './SignupPage/Continue';
import ForgotPassword from './LoginPage/ForgotPassword';
import { StatusContext, Page, emailContext } from './PageContext';


const SignupLogin = forwardRef((props, ref) =>{
    const [status, setStatus] = useState(Page.LOGIN);
    const email = useRef("");
    let setEmailValue = (value) => {
        email.current = value;
    } 
    
    const renderComponent = (argument) => {
        switch (argument) {
          case Page.CONTINUE:
            return <Continue />;
          case Page.FORGOTPASSWORD:
            return <ForgotPassword ref = {ref} />;
          case Page.SIGNUP:
            return <Signup ref = {ref} />;
          default:
            return <LoginPage ref= {ref}/>;
        }
    };
    return (
        <div className='loginPage'>
            <div className='loginBar' ref = {ref.clickOutside}>
              <StatusContext.Provider value={{status, setStatus}}>
                <emailContext.Provider value={{email, setEmailValue}}>
                {renderComponent(status)}
                </emailContext.Provider>
              </StatusContext.Provider>
            </div>
        </div>
    )
});

export default SignupLogin;