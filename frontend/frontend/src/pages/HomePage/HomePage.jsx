import React, { useRef,useEffect } from 'react';
import Banner from '../../Features/Banner/banner';
import LeftScrollBar from '../../Features/LeftScrollBar/LeftScrollBar';
import MainContent from '../../Features/MainContentPage/MainContentPage';
import SubredditPage from '../../Features/SubredditPage/SubredditPage';
import UserPage from '../../Features/UserPage/UserPage';
import LoginPage from '../../Features/LoginPage/LoginPage';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const HomeFirst = () =>{

    const [loginClicked, setLoginClicked] = useState(false);
    const loginele = {
        clickOutside: useRef(null),
        clickCross: useRef(null)
    }
    const LoginClick = (event) => {
            if(!loginClicked){
                setLoginClicked(true);
                document.body.style.overflow = "hidden";
                //console.log(event);
            }
    }
    useEffect(() => {
        const handleOutsideClick = (event) =>{
            // console.log(event.target);
            // console.log(loginele.current);
            if(loginele.clickOutside.current && !loginele.clickOutside.current.contains(event.target)){
               setLoginClicked(false);
               document.body.style.overflow = "auto";
               //console.log(event);
            }
       }
       const handleClickCross = (event) =>{
            //console.log(event);
            if(loginele.clickCross.current && loginele.clickCross.current.contains(event.target)){
                setLoginClicked(false);
                document.body.style.overflow = "auto";
            }

       }
    
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('mousedown', handleClickCross);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
          document.removeEventListener('mousedown', handleClickCross);
        };
      }, []);

    const router = createBrowserRouter([
      {
        path: "/",
        element: <MainContent />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      
        {
            path: "/subreddit",
            element: <SubredditPage />,
        }

    ]);

    return (
        <div className="App">
                
                <Banner onLoginClick={LoginClick} />
                <div className='mainContent'>
                    <LeftScrollBar />
                    <RouterProvider router={router}/>
                </div>
            
            {loginClicked && <LoginPage ref = {loginele}/>}
            
        </div>
    );
};

export default HomeFirst;