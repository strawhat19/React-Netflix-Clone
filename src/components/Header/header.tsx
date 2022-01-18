import * as React from 'react';
import { Button } from '@mui/material';
import {useState, useEffect} from "react";
import './styles/header.css';
import CustomAvatar from '../Avatar/customavatar';

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

    const username = user?.username;
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
                            <ul>
                                <li className="navigation-tab">
                                     <a className="current active hoverLink" href="./">Home</a>
                                </li>
                                <li className="navigation-tab">
                                    <a className="hoverLink" href="./shows">TV Shows</a>
                                </li>
                                <li className="navigation-tab">
                                    <a className="hoverLink" href="./movies">Movies</a>
                                </li>
                                <li className="navigation-tab">
                                    <a className="hoverLink" href="./latest">New &amp; Popular</a>
                                </li>
                                <li className="navigation-tab">
                                    <a title={`${capitalize(username)}'s List`} className="hoverLink" href="./list">{`${capitalize(username)}'s List`}</a>
                                </li>
                            </ul>
                    ) : (
                        <ul><li className="navigation-tab">React Netflix Clone</li></ul>
                    )}
                </div>
                <div className="profileSettings navigation">
                       {user ? (
                           <ul className="right">
                                <li className="right"><Button title="Search" className="iconButton searchButton"><i className="fas fa-search"></i></Button></li>
                                <li className="right"><Button title={`${capitalize(username)}'s List`} className="iconButton listButton"><i className="fas fa-list-ul"></i></Button></li>
                                <li className="user">
                                    Welcome, {capitalize(user?.username)}
                                    <CustomAvatar user={user} setUser={setUser} />
                                    <span className="caret" role="presentation"><i className="fas fa-caret-down"></i></span>
                                    <div className="logout">
                                       <p>Log out, {capitalize(user?.username)}?</p>
                                        <Button onClick={() => {
                                            setUser(null);
                                            localStorage.removeItem(`User`);
                                        }}
                                            className='logoutButton'
                                            title="Log Out"
                                            style={{
                                                color: `white`,
                                                textTransform: `none`,
                                                fontWeight: `600`
                                            }}>
                                                <i className="fas fa-sign-out-alt"></i> Logout
                                        </Button>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li className="navigation-tab">Welcome, User</li>
                                <li className="navigation-tab right"><CustomAvatar user={user} setUser={setUser} /></li>
                                <li className="navigation-tab">You Can</li>
                                <li className="navigation-tab authButton signIn"><Button 
                                onClick={() => window.location.href=`./signin`}
                                title="Sign In"
                                style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `600`,
                                }}><i className="fas fa-sign-in-alt"></i> Sign In</Button></li>
                                <li>or</li>
                                <li className="navigation-tab authButton signUp"><Button 
                                onClick={() => window.location.href=`./signup`}
                                title="Sign Up"
                                style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `600`
                                }}><i className="fas fa-user-plus"></i> Sign Up</Button></li>
                            </ul>
                        )}
                </div>
            </div>
        </header>
    )
}

export default Header