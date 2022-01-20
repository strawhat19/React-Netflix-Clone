import * as React from 'react';
import { Button } from '@mui/material';
import {useState, useEffect} from "react";
import { capitalizeWord, removeDuplicateObjFromArray } from '../../App';
import Dashboard from '../Dashboard/dashboard';
import './styles/header.css';

const Header: React.FC<State> = ({user, setUser}) => {

    const [show, setShow] = useState<any>(false);

    const transitionHeader = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    useEffect(() => {

        const listItems:any = document.querySelector(`#listItems`);
        localStorage.setItem(`User`, JSON.stringify(user));
        console.log(`User`, user);

        window.addEventListener(`scroll`, event => {
            transitionHeader();
            return () => window.removeEventListener(`scroll`, event => {
                transitionHeader();
            })
        })

        if (user?.list?.length == 0) {
            listItems?.classList.add(`hide`);
            listItems?.classList.remove(`show`);
        } else {
            listItems?.classList.add(`show`);
            listItems?.classList.remove(`hide`);
        }

    }, [user])

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
                            </ul>
                    ) : (
                        <ul><li className="navigation-tab">React Netflix Clone</li></ul>
                    )}
                </div>
                <div className="profileSettings navigation">
                       {user ? (
                           <ul className="right dashboardButtons">
                                <li className="right">
                                    <Button title="Search" className="iconButton searchButton">
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </li>
                                <Dashboard user={user} setUser={setUser} />
                                <li className="user">
                                    Welcome, {capitalizeWord(user?.username)}
                                            {user ? (
                                                <div className="customAvatar">
                                                    <span className="avatarU">{capitalizeWord(user?.email?.split(``)[0])}</span>
                                                </div>
                                                ) : (
                                                <img alt="avatar" src="./assets/avatarEdit.svg" className="customAvatar" />
                                            )}
                                    <span className="caret" role="presentation"><i className="fas fa-caret-down"></i></span>
                                    <div className="logout">
                                       <p>Log out, {capitalizeWord(user?.username)}?</p>
                                        <Button onClick={(event) => {
                                                localStorage.setItem(`Last User`, JSON.stringify(user));
                                                setUser(null);
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
                                <li className="navigation-tab right">
                                    {user ? (
                                    <div className="customAvatar">
                                        <span className="avatarU">{capitalizeWord(user?.email?.split(``)[0])}</span>
                                    </div>
                                    ) : (
                                        <img alt="avatar" src="./assets/avatarEdit.svg" className="customAvatar" />
                                    )}
                                </li>
                                <li className="navigation-tab">You Can</li>
                                <li className="navigation-tab authButton signIn"><Button 
                                onClick={(event) => window.location.href=`./signin`}
                                title="Sign In"
                                style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `600`,
                                }}><i className="fas fa-sign-in-alt"></i> Sign In</Button></li>
                                <li>or</li>
                                <li className="navigation-tab authButton signUp"><Button 
                                onClick={(event) => window.location.href=`./signup`}
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