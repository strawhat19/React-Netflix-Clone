import * as React from 'react';
import { useState } from "react";
import { Button, Modal } from '@mui/material';
import { deleteM, capitalizeWord, truncate } from '../../App';
import Moment from 'react-moment';
import './styles/dashboard.css';

const Dashboard:React.FC<State> = ({user, setUser}) => {

    const username = user?.username;
    const [open, setOpen] = useState<any>(false);

    return (
            <li className='right'>
                <Button title={`${capitalizeWord(username)}'s List`} className="listButton iconButton listButton" onClick={(event) => setOpen(true)}>
                    {user?.list?.length == 0 ? (
                        <>
                                <span className="listItems indexCircle hide" id="listItems">{user?.list?.length}</span>
                            <i className="fas fa-list-ul list listIcon">
                            </i>
                            <div className="buttonText">{`${capitalizeWord(username)}'s List`}</div>
                        </>
                    ) : (
                        <>
                                <span className="listItems indexCircle show" id="listItems">{user?.list?.length}</span>
                            <i className="fas fa-list-ul list listIcon">
                            </i>
                            <div className="buttonText">{`${capitalizeWord(username)}'s List`}</div>
                        </>
                    )}
                </Button>
                <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <div className="dashboard">
                        <div className="dashboardInner">
                            <div className={`dashboardTitleRow`}>
                                <div className={`userNameColumn titleField`}>
                                    {capitalizeWord(username)}'s List
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
                                const shortenedUserName = capitalizeWord(truncate(movieName,23));
                                return (
                                    <div className="movieRow dashboardRow" title={movieName}
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
                                                    setTimeout(() => {
                                                        setOpen(true)
                                                    }, 500);
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
    )
}

export default Dashboard