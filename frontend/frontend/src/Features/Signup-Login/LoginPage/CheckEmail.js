import "../SignupLogin.css"
import React, {useContext, useState, forwardRef, useEffect} from 'react';
import snoo from "./../../../assests/Icons/thinking-snoo.png";
import {StatusContext, Page} from "./../PageContext";

const CheckEmail = forwardRef((props, ref) => {
    const {setStatus} = useContext(StatusContext);
    const [timer, setTimer] = useState(30);
    let onOff = (timer > 0);

    if(onOff){
        setTimeout(() => {
            console.log("hd");
            setTimer(timer - 1);
        }, 1000);
    }

    return (
            <>
                    <div className='loginCross' style={{ justifyContent: "space-between" }}>
                        <button className='crossBtn' onClick={() => setStatus(Page.FORGOTPASSWORD)}>
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
                        <h1 className='loginTxt'>Check your inbox</h1>
                        <p className='loginPara'>
                            An email with a link to reset your password was sent to the email address associated with your account
                        </p>
                    </div>
                    <div>
                        <img src={snoo} alt="snoo" height="213px" width="120px" ></img>
                    </div>
                    <div className="loginBtn">
                        <span className="">Didn't get an email?</span>
                        <button disabled={timer > 0} onClick={() => setTimer(30)}>
                            {timer > 0 ? `Resend in 0:${timer}` : "Resend"}
                        </button>
                    </div>

            </>
    )
});
export default CheckEmail;