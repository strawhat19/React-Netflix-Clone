import React from "react";
import './styles/header.css';
const Header: React.FC = () => {
    return (
        <header>
            <div className="inner">
                <div className="navigation">
                    <a title="Home" className="homeLink" href="./">
                        <img className="logo" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixLogo.png" alt="Logo" />
                    </a>
                    <ul><li className="navigation-tab"><a className="current active" href="/browse">Home</a></li><li className="navigation-tab"><a href="/browse/genre/83">TV Shows</a></li><li className="navigation-tab"><a href="/browse/genre/34399">Movies</a></li><li className="navigation-tab"><a href="/latest">New &amp; Popular</a></li><li className="navigation-tab"><a href="/browse/my-list">My List</a></li></ul>
                </div>
                <div className="profileSettings navigation">
                   <ul>
                       <li><i className="fas fa-search"></i></li>
                       <li>Kids</li>
                       <li>DVD</li>
                       <li><i className="fas fa-bell"></i></li>
                   </ul>
                   <div className="dropdown">
                        <img alt="avatar" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/defaultAvatar.png" className="avatar" />
                        <span className="caret" role="presentation"><i className="fas fa-caret-down"></i></span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header