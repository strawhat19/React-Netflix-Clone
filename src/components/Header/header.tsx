import * as React from 'react';
import { Button, Modal } from '@mui/material';
import {useState, useEffect} from "react";
import Moment from 'react-moment';
import './styles/header.css';
import CustomAvatar from '../Avatar/customavatar';
import { deleteM, capitalize, truncate } from '../../App';

const Header: React.FC<State> = ({user, setUser, updateUser}) => {

    const username = user?.username;
    const [show, setShow] = useState<any>(false);
    const [open, setOpen] = useState<any>(false);

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
                           <ul className="right">
                                <li className="right">
                                    <Button title="Search" className="iconButton searchButton">
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </li>
                                <li className="right">
                                    <Button title={`${capitalize(username)}'s List`} className="iconButton listButton"
                                    onClick={(event) => setOpen(true)}>
                                       {user?.list?.length == 0 ? (
                                            <i className="fas fa-list-ul list">
                                                <span className="listItems hide" id="listItems">{user?.list?.length || 0}</span>
                                            </i>
                                       ) : (
                                        <i className="fas fa-list-ul list">
                                            <span className="listItems show" id="listItems">{user?.list?.length || 0}</span>
                                        </i>
                                       )}
                                    </Button>
                                    <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                        <div className={`listOfMovies`}>
                                            <div className="dashboard">
                                                <div className={`dashboardTitleRow`}>
                                                    <div className={`userNameColumn titleField`}>
                                                        {capitalize(username)}'s List
                                                    </div>
                                                    <div className="dashboardTitleInnerRow dashboardRow">
                                                        <div title="Name" className={`nameColumn titleField`}>Name</div>
                                                        <div title="Votes" className={`ratingColumn titleField`}>Votes</div>
                                                        <div title="Rating" className={`rating titleField`}>Rating</div>
                                                        <div title="Delete" className={`delete titleField`}>Delete</div>
                                                        <div title="Release Date" className={`date titleField`}>Release Date</div>
                                                    </div>
                                                </div>
                                                {user?.list?.map((movie:any, index:any) => {
                                                    const movieName = movie?.name || movie?.title || movie?.original_name;
                                                    const shortenedUserName = capitalize(truncate(movieName,23));
                                                    return (
                                                        <div className="movie dashboardRow" title={movieName}
                                                            key={index} id={index} data-movie={JSON.stringify(movie)}>
                                                                    <span title={movieName} className="movieName movieData titleField">
                                                                        <div className="index">{index+1}</div>
                                                                        <div className="shortenedUserName">
                                                                            {shortenedUserName}
                                                                        </div>
                                                                    </span>
                                                                    <span title="Votes" className="votes titleField">
                                                                        <i className="fas fa-fire"></i>
                                                                        {Math.floor(movie?.popularity)} 
                                                                    </span>
                                                                    <span title="Rating" className="vote_average titleField">
                                                                        <i className="fas fa-thumbs-up"></i>
                                                                        {movie?.vote_average * 10 + `%`} 
                                                                    </span>
                                                                    <span title={`Delete ${movieName}`} className="delete titleField"
                                                                    onClick={(event) => {
                                                                        const movieObj:any = event.currentTarget?.parentElement?.getAttribute(`data-movie`);
                                                                        const mov:any = JSON.parse(movieObj);
                                                                        deleteM(mov, user, setUser);
                                                                        setOpen(false);
                                                                        setTimeout(() => setOpen(true), 500);
                                                                    }}>
                                                                        <i className="fas fa-trash"></i>
                                                                        {shortenedUserName}
                                                                    </span>
                                                                    <span title="Release Date" className="release_date titleField">
                                                                        <i className="fas fa-calendar-day"></i>
                                                                        <Moment format='MMMM Do YYYY'>
                                                                                {movie?.release_date}
                                                                        </Moment>
                                                                    </span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </Modal>
                                </li>
                                <li className="user">
                                    Welcome, {capitalize(user?.username)}
                                    <CustomAvatar user={user} setUser={setUser} />
                                    <span className="caret" role="presentation"><i className="fas fa-caret-down"></i></span>
                                    <div className="logout">
                                       <p>Log out, {capitalize(user?.username)}?</p>
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
                                <li className="navigation-tab right"><CustomAvatar user={user} setUser={setUser} /></li>
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