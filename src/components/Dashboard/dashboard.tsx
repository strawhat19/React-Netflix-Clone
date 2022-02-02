import * as React from 'react';
import { useState } from "react";
import { Button, Modal } from '@mui/material';
import { capitalizeWord, truncate, deleteMovie } from '../../App';
import Moment from 'react-moment';
import './styles/dashboard.css';

const Dashboard:React.FC<State> = ({user, setUser}) => {

    const username = user?.username;
    const [open, setOpen] = useState<any>(false);

    return (
            <li className={`right dashB ${user?.list?.length === 0 ? `dashHidden` : `dashvisible`}`}>
                <Button title={`${capitalizeWord(username)}'s List`} className="listButton iconButton" onClick={(event) => user?.list?.length !== 0 ? setOpen(true) : setOpen(false)}>
                    {user?.list?.length === 0 ? (
                        <>
                            <span className="listItems indexCircle hide" id="listItems">{user?.list?.length}</span>
                            <i className="fas fa-list-ul list listIcon"></i>
                            <div className="buttonText">{`${capitalizeWord(username)}'s List`}</div>
                        </>
                    ) : (
                        <>
                            <span className="listItems indexCircle show" id="listItems">{user?.list?.length}</span>
                            <i className="fas fa-list-ul list listIcon"></i>
                            <div className="buttonText">{`${capitalizeWord(username)}'s List`}</div>
                        </>
                    )}
                </Button>
                <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <div className={`dashboard ${user?.list?.length === 0 ? `dashboardHidden` : `dashboardVisible`}`}>
                        <div className="dashboardInner">
                            <div className={`dashboardTitleRow`}>
                                <div className="dashboardTitleInnerRow dashboardRow">
                                    <div title="Name" className={`name titleField titleRowName`}>
                                        <div className="index">
                                                <span className="indexNumber">{user?.list?.length}</span>
                                            </div> 
                                        {capitalizeWord(username)}'s List <span className="sep">|</span> Item Name 
                                    </div>
                                    <div title="Votes" className={`votes titleField`}><span className="sep">|</span> Votes</div>
                                    <div title="Rating" className={`rating titleField`}><span className="sep">|</span> Rating</div>
                                    <div title="Release Date" className={`date titleField`}><span className="sep">|</span> Release Date</div>
                                    <div title="Delete All" className={`delete titleField`} 
                                        onClick={(event) => {
                                            setUser({
                                                email: user?.email,
                                                username: user?.username,
                                                password: user?.password,
                                                list: []
                                            });
                                            if (user?.list?.length === 0) {
                                                setOpen(false);
                                            } else {
                                                setOpen(true);
                                            }
                                        }}><span className="sep">|</span> Delete <div className="index">
                                        <span className="indexNumber">{user?.list?.length}</span>
                                    </div> Items</div>
                                </div>
                            </div>
                            {user?.list?.map((movie:any, index:any) => {
                                const movieName = movie?.name || movie?.title || movie?.original_name;
                                const shortenedUserName = capitalizeWord(truncate(movieName, 60));
                                return (
                                    <div className="movieRow dashboardRow" title={movieName}
                                        key={index} id={index} data-movie={JSON.stringify(movie)}>
                                            <span title={movieName} className="name titleField hoverLink">
                                                <div className="index">{index+1}</div>
                                                <div className="shortenedUserName">
                                                    {shortenedUserName}
                                                </div>
                                            </span>
                                            <span title="Votes" className="votes titleField hoverLink">
                                                <i className="fas fa-fire"></i>
                                                {Math.floor(movie?.popularity)} 
                                            </span>
                                            <span title="Rating" className="rating titleField hoverLink">
                                                <i className="fas fa-thumbs-up"></i>
                                                {movie?.vote_average * 10 + `%`} 
                                            </span>
                                            <span title="Release Date" className="date titleField hoverLink">
                                                <i className="fas fa-calendar-day"></i>
                                                <Moment format='MMMM Do YYYY'>
                                                        {movie?.release_date}
                                                </Moment>
                                            </span>
                                            <span title={`Delete ${movieName}`} className="delete titleField hoverLink"
                                                onClick={(event) => {
                                                    const movieObj:any = event.currentTarget?.parentElement?.getAttribute(`data-movie`);
                                                    const mov:any = JSON.parse(movieObj);
                                                    deleteMovie(mov, user, setUser);
                                                    if (user?.list?.length === 1) {
                                                        setOpen(false);
                                                    } else {
                                                        setOpen(true);
                                                    }
                                                }}>
                                                    <i className="fas fa-trash"></i> Delete {capitalizeWord(truncate(movieName, 20))}
                                            </span>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                </Modal>
            </li>
    )
}

export default Dashboard