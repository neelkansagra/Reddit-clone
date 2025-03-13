import React from 'react';
import './banner.css'
import Logo from '../../components/RedditLogo/Logo'
import SearchBar from '../SearchBar/SearchBar'
import SideButtons from '../SideBtn/SideButtons';

const Banner = ({onLoginClick}) => {
    return (
        <header className="banner">
          <nav className="nav">
          <Logo />
          <SearchBar />
          <SideButtons LoginClick = {onLoginClick}/>
          </nav>
        </header>
      );
};

export default Banner;