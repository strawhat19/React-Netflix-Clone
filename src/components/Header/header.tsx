import './styles/header.css';

import * as React from 'react';
import MobileMenu from './mobileMenu';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {useState, useEffect} from "react";
import Dashboard from '../Dashboard/dashboard';
import { capitalizeWord, listItems } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
                <div className="navigation navigationLeft">
                    <Link to={'/'}>
                        <a title="Home" className="homeLink" href="./">
                            <LazyLoadImage effect="blur" src={`https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixLogo.png`} id={`logo`} className="logo" alt={`logo`} width={`100px`} height={`auto`} />
                        </a>
                    </Link>
                    {!user ? null : (
                        <ul>
                            <li className="navigation-tab">
                                <Link to={'/'}>
                                    <a className="current active hoverLink" href="./">Home</a>
                                </Link>
                            </li>
                            <li className="navigation-tab">
                                <Link to={'/shows'}>
                                    <a className="hoverLink" href="./shows">TV Shows</a>
                                </Link>
                            </li>
                            <li className="navigation-tab">
                                <Link to={'/movies'}>
                                    <a className="current active hoverLink" href="./movies">Movies</a>
                                </Link>
                            </li>
                            <li className="navigation-tab">
                                <Link to={'/latest'}>
                                    <a className="hoverLink" href="./latest">New &amp; Popular</a>
                                </Link>
                            </li>
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
                                <li className="navigation-tab githubButton">
                                    <Button className='authButton' 
                                        onClick={(event) => window.open(`https://github.com/strawhat19/react-netflix-clone`, `_blank`)}
                                        title="Sign In"
                                        style={{
                                            color: `white`,
                                            textTransform: `none`,
                                            fontWeight: `600`,
                                        }}>
                                            <i className="fab fa-github"></i> 
                                            React Netflix Clone Github Repo
                                    </Button>
                                </li>
                            </ul>
                        )}
                        {user && <MobileMenu user={user} setUser={setUser} />}
                </div>
            </div>
        </header>
    )
}

export default Header