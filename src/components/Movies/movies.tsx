import * as React from 'react'
import {Suspense} from 'react'
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Row from '../Row/row';
import TopButton from '../TopButton/topbutton';
import Banner from '../Banner/banner';
import { randomMovieURL, movieURLS } from '../../App';
import List from '../List/list';

const Movies: React.FC<State> = ({user, setUser, movie, setMovie}) => {

    return (
        <>
        <Header user={user} setUser={setUser} />
        <TopButton />
        <Suspense fallback={<>Banner Loading</>}>
            <Banner user={user} setUser={setUser} fetchMovie={randomMovieURL} movie={movie} setMovie={setMovie} />
        </Suspense>
        <main className="content movies multiple">
            <div className="inner">
                <div className="initial">
                    <div className={user?.list?.length === 0 ? `row pageTitleRow noMovie` : `row pageTitleRow`}>
                        <h3 className={`cHeader`}>Movies</h3>
                        <span className="rowTotal">120 Items Total</span>
                        {/* <span className="rowTotal">{document.querySelectorAll(`.topicRow .movieElement`)?.length} Items</span> */}
                    </div>
                    <List user={user} setUser={setUser} />
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Top Rated" movieURL={movieURLS.topRated} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="In Theaters" movieURL={movieURLS.inTheaters} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Action" movieURL={movieURLS.action} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>   
                        <Row title="Romance" movieURL={movieURLS.romance} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Comedies" movieURL={movieURLS.comedy} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Horror" movieURL={movieURLS.horror} user={user} setUser={setUser} />
                    </Suspense>
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}   

export default Movies