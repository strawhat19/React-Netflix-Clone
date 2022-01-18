import * as React from 'react';
import { Button } from '@mui/material';
import {useState, useEffect} from "react";
import './styles/header.css';

interface Props {
    user?: any,
    setUser?: any,
    [key: string]: any
}

// Capitalize First Letter of Word
export const capitalize = (word:string) => {
    let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord.split(`-`)[0];
}

const Header: React.FC<Props> = ({user, setUser}) => {

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
                                <div className="userArea dropdown">
                                    Welcome, {capitalize(user?.username)}
                                    <img alt="avatar" src="./assets/avatarEdit.jpg" className="avatar" />
                                    <span className="caret" role="presentation"><i className="fas fa-caret-down"></i></span>
                                    <div className="logout">
                                       <p>Log out, {capitalize(user?.username)}?</p>
                                        <Button onClick={() => {
                                            // setUser(null);
                                            localStorage.removeItem(`User`);
                                            window.location.href = `./`
                                        }}
                                            className='logoutButton'
                                            title="Log Out"
                                            style={{
                                                color: `white`,
                                                textTransform: `none`,
                                                fontWeight: `600`
                                            }}>
                                                Logout
                                        </Button>
                                    </div>
                                </div>
                            </ul>
                        ) : (
                            <ul>
                                <li className="navigation-tab authButton signIn"><Button 
                                onClick={() => window.location.href=`./signin`}
                                title="Sign In"
                                style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `600`
                                }}>Sign In</Button></li>
                                <li>or</li>
                                <li className="navigation-tab authButton signUp"><Button 
                                onClick={() => window.location.href=`./signup`}
                                title="Sign Up"
                                style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `600`
                                }}>Sign Up</Button></li>
                            </ul>
                        )}
                </div>
            </div>
        </header>
    )
}

export default Header