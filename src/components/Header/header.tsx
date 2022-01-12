import React from "react";
import './styles/header.css';
const Header: React.FC = () => {
    return (
        <header>
            <div className="inner">
                <a title="Home" className="homeLink" href="./">
                    <img className="logo" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixLogo.png" alt="Logo" />
                </a>
                <div className="profileSettings">
                    <img alt="avatar" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/defaultAvatar.png" className="avatar" />
                </div>
            </div>
        </header>
    )
}

export default Header