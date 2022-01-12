import React from "react";
import './styles/header.css';
const Header: React.FC = () => {
    return (
        <header>
            <a title="Home" className="logo homeLink" href="./">
                Home
                {/* <img src="/apps/react-netflix-clone/public/assets/netflixLogo.png" />  LOGO WILL GO HERE */}
            </a>
        </header>
    )
}

export default Header