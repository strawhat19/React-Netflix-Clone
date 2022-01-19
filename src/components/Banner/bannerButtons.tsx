import * as React from 'react'
import { useEffect } from 'react';
import { Button } from '@mui/material'
import { addM, deleteM } from '../../App';
import { updateListButtons } from '../../App';

const BannerButtons:React.FC<State> = ({user, setUser, list, setList, fetchMovie, state, movie, setMovie}) => {

    const bannerButtons = document.querySelector(`.bannerButtons`);
    const includes = list.includes(movie);
    const update = () => {
        if (!includes) {
            addM(movie, user, list, setList, setUser);
        } else {
            deleteM(movie, user, list, setList, setUser);
        }
    }

    useEffect(() => {
        updateListButtons(includes);
    }, [user, includes])

    return (
        <div className="bannerButtons" data-movie={JSON.stringify(movie)}>
            <Button className="play"><i className="fas fa-play"></i> Play</Button>
            {/* <Button className={`listButton list`}  id="list" onClick={update}><i className="fas fa-list"></i> Update List</Button> */}
            <Button className={`listButton plus`}  id="plus" onClick={update}><i className="fas fa-plus"></i> Add to List</Button>
            <Button className={`listButton minus`} id="minus"  onClick={update}><i className="fas fa-minus"></i> Delete from List</Button>
        </div>
    )
}
export default BannerButtons