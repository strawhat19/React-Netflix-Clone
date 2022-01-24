import * as React from 'react';
import{useState,useEffect} from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactSlidy from 'react-slidy';
import 'react-slidy/lib/styles.css'
import "./styles/row.css";
import Movie from '../Movie/movie';

const Row: React.FC<State> = ({user, setUser, title, movieURL}) => {
    
    const [movies, setMovies] = useState<any>(null);

    useEffect(() => {
        const getMovies = async (movieURL:any) => {
            const response = await fetch(movieURL);
            const rowMovies = await response.json();
            const randomizedMovies = rowMovies.results.sort((a:any, b:any) => 0.5 - Math.random());
            setMovies(randomizedMovies);
            return rowMovies;
        }
        getMovies(movieURL);
    }, [movieURL]);

    return (
        <div className={`row topicRow ${title}`} id={title}>
            <h2 className='rowTitle'>
                {title}
                <span className="rowTotal"><span className="rowIndex">20</span> Items</span>
            </h2>
            <div className="movieRow">
                {!movies && (
                        <>
                            <div className="skeleton movie">
                                <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                            </div>
                        </>
                )}
                {movies && (
                    <ReactSlidy numOfSlides={20} infiniteLoop>
                        <Movie user={user} setUser={setUser} movie={movies[0]} index={0} />
                        <Movie user={user} setUser={setUser} movie={movies[1]} index={1} />
                        <Movie user={user} setUser={setUser} movie={movies[2]} index={2} />
                        <Movie user={user} setUser={setUser} movie={movies[3]} index={3} />
                        <Movie user={user} setUser={setUser} movie={movies[4]} index={4} />
                        <Movie user={user} setUser={setUser} movie={movies[5]} index={5} />
                        <Movie user={user} setUser={setUser} movie={movies[6]} index={6} />
                        <Movie user={user} setUser={setUser} movie={movies[7]} index={7} />
                        <Movie user={user} setUser={setUser} movie={movies[8]} index={8} />
                        <Movie user={user} setUser={setUser} movie={movies[9]} index={9} />
                        <Movie user={user} setUser={setUser} movie={movies[10]} index={10} />
                        <Movie user={user} setUser={setUser} movie={movies[11]} index={11} />
                        <Movie user={user} setUser={setUser} movie={movies[12]} index={12} />
                        <Movie user={user} setUser={setUser} movie={movies[13]} index={13} />
                        <Movie user={user} setUser={setUser} movie={movies[14]} index={14} />
                        <Movie user={user} setUser={setUser} movie={movies[15]} index={15} />
                        <Movie user={user} setUser={setUser} movie={movies[16]} index={16} />
                        <Movie user={user} setUser={setUser} movie={movies[17]} index={17} />
                        <Movie user={user} setUser={setUser} movie={movies[18]} index={18} />
                        <Movie user={user} setUser={setUser} movie={movies[19]} index={19} />
                    </ReactSlidy>
                )}
            </div>
        </div>
    )
}

export default Row