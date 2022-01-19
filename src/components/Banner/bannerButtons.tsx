import * as React from 'react'
import { useEffect } from 'react';
import { Button } from '@mui/material'
import { addM, deleteM, plus, minus } from '../../App';

const BannerButtons:React.FC<State> = ({user, setUser, movie, setMovie}) => {

    const includes:any = user?.list?.includes(movie);
    const update = (event?:any) => {
        console.log(event);
        console.log(event.target);
        addM(movie, user, setUser);
        if (includes) {
            deleteM(movie, user, setUser);
        }
    }

    return (
        <div className="bannerButtons" data-movie={JSON.stringify(movie)}>
            <Button className="play"><i className="fas fa-play"></i> Play</Button>
            {user?.list?.includes(movie) ? (
                <Button className={`listButton minus`} id="minus"  onClick={(event) => update(event)}><i className="fas fa-minus"></i> Delete from List</Button>
            ) : (
                <Button className={`listButton plus`}  id="plus" onClick={(event) => update(event)}><i className="fas fa-plus"></i> Add to List</Button>
            )}
        </div>
    )
}
export default BannerButtons