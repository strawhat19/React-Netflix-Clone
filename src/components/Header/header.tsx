import * as React from 'react';
import { Button, Modal } from '@mui/material';
import {useState, useEffect} from "react";
import Moment from 'react-moment';
import './styles/header.css';
import CustomAvatar from '../Avatar/customavatar';
import { truncate } from '../Row/row';

// Capitalize First Letter of Word
export const capitalize = (word:string) => {
    let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalizedWord.split(`-`)[0];
}

const Header: React.FC<State> = ({user, setUser, list, setList, state, setState}) => {

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

        window.addEventListener(`scroll`, event => {
            transitionHeader();
            return () => window.removeEventListener(`scroll`, event => {
                transitionHeader();
            })
        })

        if (list?.length == 0) {
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
                                <li className="navigation-tab">
                                    <a title={`${capitalize(username)}'s List`} className="hoverLink" href="./list">
                                        {`${capitalize(username)}'s List`} {list?.length > 0 ? (
                                            <span className="show">{`(${list?.length})`}</span>
                                        ) : (
                                            <span className="hide">{`(${list?.length})`}</span>
                                        )}
                                    </a>
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
                                    onClick={() => setOpen(true)}>
                                       {list?.length == 0 ? (
                                            <i className="fas fa-list-ul list">
                                                <span className="listItems hide" id="listItems">{list?.length || 0}</span>
                                            </i>
                                       ) : (
                                        <i className="fas fa-list-ul list">
                                            <span className="listItems show" id="listItems">{list?.length || 0}</span>
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
                                                        <div className={`nameColumn titleField`}>Name</div>
                                                        <div className={`ratingColumn titleField`}>Votes</div>
                                                        <div className={`rating titleField`}>Rating</div>
                                                        <div className={`delete titleField`}>Delete</div>
                                                        <div className={`date titleField`}>Date</div>
                                                    </div>
                                                </div>
                                                {user.list.map((movie:any, index:any) => {
                                                    const movieName = movie?.name || movie?.title || movie?.original_name;
                                                    const shortenedUserName = capitalize(truncate(movieName,25));
                                                    return (
                                                        <div className="movie dashboardRow" 
                                                            key={index} id={index}>
                                                                <span className="movieName movieData titleField">
                                                                    {index+1+`. `+shortenedUserName}
                                                                </span>
                                                                <span title="popularity" className="popularity titleField">
                                                                    <i className="fas fa-fire"></i>
                                                                    {Math.floor(movie?.popularity)} 
                                                                </span>
                                                                <span title="rating" className="vote_average titleField">
                                                                    <i className="fas fa-thumbs-up"></i>
                                                                    {movie?.vote_average * 10 + `%`} 
                                                                </span>
                                                                <span title="delete this" className="delete titleField">
                                                                    <i className="fas fa-trash"></i>
                                                                    {shortenedUserName}
                                                                </span>
                                                                <span title="release date" className="release_date titleField">
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
                                        <Button onClick={() => {
                                            setUser(null);
                                            setList(null);
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