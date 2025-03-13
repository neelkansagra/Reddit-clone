import React,{ useState } from "react";
import GetAppBtn from '../../components/GetAppButton/GetAppBtn'
import LoginBtn from '../../components/LoginBtn/LoginBtn'
import OpenSettings from '../../components/OpenSettings/OpenSettings'
import './SideButtons.css'

const SideButtons = ({LoginClick}) =>{
        return (
            <div className="SideBar">
                <GetAppBtn />
                <LoginBtn Click = {LoginClick}/>
                <OpenSettings />
            </div>
        );
};
export default SideButtons;