import * as React from 'react'
import Movie from '../Movie/movie';
import { capitalizeWord } from '../../App';

const List:React.FC<State> = ({user, setUser}) => {

    const username = user?.username;

    return (
        <>
        {user?.list?.length !== 0 ? (
            <div className="list">
                <div className="row" >
                    <h2 className={`cHeader`}>{capitalizeWord(username)}'s List ({`${user?.list?.length}`})</h2>
                    <div className="movieRow">
                        {user?.list?.length == 0 ? (
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