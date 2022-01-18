import { Button } from '@mui/material';
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
    const [user, setUser] = useState<any>(null);

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
                    {user ? (
                             <ul><li className="navigation-tab"><a className="current active hoverLink" href="./">Home</a></li><li className="navigation-tab"><a className="hoverLink" href="/genre/83">TV Shows</a></li><li className="navigation-tab"><a className="hoverLink" href="/genre/34399">Movies</a></li><li className="navigation-tab"><a className="hoverLink" href="/latest">New &amp; Popular</a></li><li className="navigation-tab"><a className="hoverLink" href="./my-list">My List</a></li></ul>
                    ) : (
                        <ul><li className="navigation-tab">Welcome, User</li></ul>
                    )}
                </div>
                <div className="profileSettings navigation">
                       {user ? (
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
                        ) : (
                            <ul>
                                <li className="navigation-tab authButton signIn"><Button style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `700`
                                }}>Sign In</Button></li>
                                <li>or</li>
                                <li className="navigation-tab authButton signUp"><Button style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `700`
                                }}>Sign Up</Button></li>
                            </ul>
                        )}
                </div>
            </div>
        </header>
    )
}

export default Header