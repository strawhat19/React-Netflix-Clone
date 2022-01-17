import * as React from 'react';
import{useState, useEffect, useContext} from "react";
import TopButton from '../TopButton/topbutton';
import './styles/header.css';

declare global {
    namespace JSX {
        interface IntrinsicElements {
        'person-info': PersonInfoProps
        }
    }
}

interface PersonInfoProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    heading: string,
    subHeading: string,
    size?: string
}

const Header: React.FC = () => {

    const [show, setShow] = useState<any>(false);

    const transitionHeader = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener(`scroll`, event => {
            transitionHeader();
            return () => window.removeEventListener(`scroll`, event => {
                transitionHeader();
            })
        })
    }, [])

    return (
        <header className={show ? `scrolledHeader` : `topHeader`}>
            <div className="inner">
                <div className="navigation">
                    <a title="Home" className="homeLink" href="./">
                        <img className="logo" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixLogo.png" alt="Logo" />
                    </a>
                    <ul><li className="navigation-tab"><a className="current active hoverLink" href="./">Home</a></li><li className="navigation-tab"><a className="hoverLink" href="/browse/genre/83">TV Shows</a></li><li className="navigation-tab"><a className="hoverLink" href="/browse/genre/34399">Movies</a></li><li className="navigation-tab"><a className="hoverLink" href="/latest">New &amp; Popular</a></li><li className="navigation-tab"><a className="hoverLink" href="/browse/my-list">My List</a></li></ul>
                </div>
                <div className="profileSettings navigation">
                   <ul>
                       <li><i className="fas fa-search"></i></li>
                       <li style={{
                           marginRight: `20px`
                       }}><i className="fas fa-list-ul"></i></li>
                       Welcome, User
                       <div className="dropdown">
                            <img alt="avatar" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/defaultAvatar.png" className="avatar" />
                            <span className="caret" role="presentation"><i className="fas fa-caret-down"></i></span>
                        </div>
                   </ul>
                </div>
            </div>
        </header>
    )
}

export default Header