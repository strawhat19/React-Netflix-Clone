import * as React from 'react'
import { Suspense } from 'react'
import Header from '../Header/header';
import TopButton from '../TopButton/topbutton';
import Banner from '../Banner/banner';
import List from '../List/list';
import Row from '../Row/row';
import Footer from '../Footer/footer';
import { movieURLS, randomMovieURL } from '../../App';

const Home: React.FC<State> = ({user, setUser, movie, setMovie}) => {

    return (
        <>
            <Header user={user} setUser={setUser} />
            <TopButton />
            <Suspense fallback={<>Banner Loading</>}>
                <Banner user={user} setUser={setUser} fetchMovie={randomMovieURL} movie={movie} setMovie={setMovie} />
            </Suspense>
            <Suspense fallback={<main>Movies Loading...</main>}>
                <main className="movieRows homePageMain">
                    <div className={user?.list?.length === 0 ? `row pageTitleRow noMovie homeTitleNoMovie` : `row pageTitleRow`} id={user?.list?.length === 0 ? `homeTitleNoMovie` : `pageTitleRow`}>
                        <h3 className={`cHeader`}>Homepage</h3>
                        <span className="rowTotal">180 Items Total</span>
                        {/* <span className="rowTotal">{document.querySelectorAll(`.topicRow .movieElement`)?.length} Items</span> */}
                    </div>
                    <List user={user} setUser={setUser} />
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Netflix Originals" movieURL={movieURLS.netflixOriginals} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Trending Now" movieURL={movieURLS.trending} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="In Theaters" movieURL={movieURLS.inTheaters} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Top Rated" movieURL={movieURLS.topRated} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Action" movieURL={movieURLS.action} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Comedies" movieURL={movieURLS.comedy} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Horror" movieURL={movieURLS.horror} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>   
                        <Row title="Romance" movieURL={movieURLS.romance} user={user} setUser={setUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Documentaries" movieURL={movieURLS.documentaries} user={user} setUser={setUser} />
                    </Suspense>
                </main>
            </Suspense>
            <Footer />
          </>
    )
}

export default Home