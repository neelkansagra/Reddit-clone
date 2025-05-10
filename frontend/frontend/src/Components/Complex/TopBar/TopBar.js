import React from 'react';
import './TopBar.css'
// import Logo from '../../UI/RedditLogo/RedditLogo'
import SearchBar from '../../Layout/SearchBar/SearchBar'
// import SideButtons from '../SideBtn/SideButtons';
import RedditLogo from '../../UI/RedditLogo/RedditLogo';

const TopBar = ({onLoginClick}) => {
    return (
        <header className="banner">
          <nav className="nav">
          <RedditLogo width="32px" height="32px" link="/" textSize="22px"/>
           <SearchBar />
          {/*<SideButtons LoginClick = {onLoginClick}/> */}
          </nav>
        </header>
      );
};

export default TopBar;