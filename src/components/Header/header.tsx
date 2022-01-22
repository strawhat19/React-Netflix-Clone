import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {useState, useEffect} from "react";
import { capitalizeWord, listItems } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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

        localStorage.setItem(`User`, JSON.stringify(user));
        window.addEventListener(`scroll`, event => {
            transitionHeader();
            return () => window.removeEventListener(`scroll`, event => {
                transitionHeader();
            })
        })

        if (user?.list?.length === 0) {
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
                        <LazyLoadImage effect="blur" src={`https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixLogo.png`} id={`logo`} className="logo" alt={`logo`} width={`100px`} height={`auto`} />
                    </a>
                    {user ? (
                            <ul>
                                <li className="navigation-tab">
                                     <Link to={'./'}>
                                        <a className="current active hoverLink" href="./">Home</a>
                                    </Link>
                                </li>
                                <li className="navigation-tab">
                                    <Link to={'./shows'}>
                                        <a className="hoverLink" href="./shows">TV Shows</a>
                                    </Link>
                                </li>
                                <li className="navigation-tab">
                                    <Link to={'./movies'}>
                                        <a className="current active hoverLink" href="./movies">Movies</a>
                                    </Link>
                                </li>
                                <li className="navigation-tab">
                                    <Link to={'./movies'}>
                                        <a className="hoverLink" href="./latest">New &amp; Popular</a>
                                    </Link>
                                </li>
                            </ul>
                    ) : (
                        <ul>
                            <li className="navigation-tab">
                                <a className="current active hoverLink" href="https://github.com/strawhat19/react-netflix-clone">
                                    <i className="fab fa-github authGithub"></i> <span className="sep">|</span> React Netflix Clone
                                </a>
                            </li>
                            {/* <li className="navigation-tab">
                                <a className="hoverLink" href="./about">About</a>
                            </li>
                            <li className="navigation-tab">
                                <a className="hoverLink" href="./contact">Contact</a>
                            </li> */}
                        </ul>
                    )}
                </div>
                <div className="profileSettings navigation">
                       {user ? (
                           <ul className="dash buttons">
                                <li className="search">
                                   <ul className="dash buttons"> <li className="right">
                                    <Button title="Search" className="iconButton searchButton">
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </li>
                                <Dashboard user={user} setUser={setUser} />
                            </ul>
                                    {user ? (
                                        <div className="user" title='User Settings'>
                                            <div className="customAvatar">
                                                <span className="avatarLetter">{capitalizeWord(user?.email?.split(``)[0])}</span>
                                            </div>
                                            <span className="caret" role="presentation"><i className="fas fa-caret-down"></i></span>
                                            <div className="logout">
                                                <p>Log out, {capitalizeWord(user?.username)}?</p>
                                                <Button onClick={(event) => {
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
                                        </div>
                                        ) : (
                                        <img alt="avatar" src="./assets/avatarEdit.svg" className="avatar" />
                                    )}
                                </li>
                            </ul>
                        ) : (
                            <ul className='authHeaderRightSide'>
                                <li className="navigation-tab">Welcome, User</li>
                                <li className="navigation-tab right">
                                    {user ? (
                                    <div className="customAvatar">
                                        <span className="avatarU">{capitalizeWord(user?.email?.split(``)[0])}</span>
                                    </div>
                                    ) : (
                                        <img alt="avatar" src="./assets/avatarEdit.svg" className="avatar" />
                                    )}
                                </li>
                                <li className="navigation-tab">You Can</li>
                                <li className="navigation-tab signIn"><Button className='authButton' 
                                onClick={(event) => window.location.href=`./signin`}
                                title="Sign In"
                                style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `600`,
                                }}><i className="fas fa-sign-in-alt"></i> Sign In</Button></li>
                                <li>or</li>
                                <li className="navigation-tab signUp"><Button className='authButton' 
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