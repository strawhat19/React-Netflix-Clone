import * as React from 'react'
import Movie from '../Movie/movie';
import { capitalizeWord } from '../../App';
import { Button } from '@mui/material';

const List:React.FC<State> = ({user, setUser}) => {

    const username = user?.username;

    return (
        <>
        {user?.list?.length !== 0 ? (
            <div className={`list customList`}>
                <div className="row" >
                    <div className="titleRow">
                        <h2 className={`cHeader titleRowName`}>
                            <div className="index">
                                <span className="indexNumber" title={`Item ${user?.list?.length}`}>{user?.list?.length}</span>
                            </div> {capitalizeWord(username)}'s List
                        </h2>
                        <ul className="dash buttons">
                            <li className="right deleteAllButton">
                                <Button title={`Delete All`} className="listButton iconButton listButton" onClick={(event) => {
                                        setUser({
                                            email: user?.email,
                                            username: user?.username,
                                            password: user?.password,
                                            list: []
                                        });
                                    }}>
                                    {user?.list?.length === 0 ? (
                                        <>
                                            <span className="listItems indexCircle hide" id="listItems">{user?.list?.length}</span>
                                            <i className="fas fa-trash-alt list listIcon"></i>
                                            <div className="buttonText">{`Delete All`}</div>
                                        </>
                                    ) : (
                                        <>
                                            <span className="listItems indexCircle show" id="listItems">{user?.list?.length}</span>
                                            <i className="fas fa-trash-alt list listIcon"></i>
                                            <div className="buttonText">{`Delete All`}</div>
                                        </>
                                    )}
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="movieRow">
                        {user?.list?.length === 0 ? (
                                <div className="pleaseAdd">Please Add Movies</div>
                            ) : (
                            <>
                                {user?.list?.map((movie:any,index:any) => <Movie user={user} setUser={setUser} movie={movie} index={index} key={index} />)}
                            </>
                        )}
                    </div>
                </div>
            </div>
        ) : <div className='myList'></div>}
        </>
    )
}

export default List