import * as React from 'react';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './components/Auth/auth';
import Home from './components/Home/home';
import TVShows from './components/TVShows/tvshows';
import Movies from './components/Movies/movies';
import Latest from './components/Latest/latest';
import './styles/App.css';

// Global Variables
declare global { 
  namespace JSX {
    interface IntrinsicElements {
        'footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    }
  }
  namespace TSX {
    interface IntrinsicElements {
        'footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    }
}
  interface State {
    user?: any,
    setUser?: any,
    email?:any,
    setEmail?:any,
    updateUser?: any,
    movie?:any,
    movies?: any,
    setMovie?: any,
    setMovies?: any,
    index?: any
    title?: string,
    open?:any,
    setOpen?:any,
    movieURL?: any,
    movieURLS?:any,
    fetchMovie?: any,
    bannerMovie?: any,
    randomMovieURL?: any,
    [key: string]: any
  }
}

// Global DOM Elements
export const plus = document.querySelector(`#plus`);
export const minus = document.querySelector(`#minus`);
export const banner = document.querySelector(`#banner`);
export const signUpForm = document.querySelector(`#signUpForm`);
export const signInForm = document.querySelector(`#signInForm`);
export const pageName = window.location.pathname.replace(`/`,``);
export const listItems:any = document.querySelector(`#listItems`);
export const emailForm = document.querySelector(`#emailAddressForm`);
export const sliderNext = document.querySelector(`.react-Slidy-next`);

// API Elements
export const APIKey = process.env.REACT_APP_API_KEY;
export const baseImageURL = `https://image.tmdb.org/t/p/original`;
export const baseTMDBURL = `https://api.themoviedb.org/3`;
export const movieURLS = {
  trending: `${baseTMDBURL}/trending/all/week?api_key=${APIKey}&language=en-US`,
  netflixOriginals: `${baseTMDBURL}/discover/tv?api_key=${APIKey}&with_networks=213`,
  topRated: `${baseTMDBURL}/movie/top_rated?api_key=${APIKey}&language=en-US`,
  action: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=28`,
  comedy: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=35`,
  horror: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=27`,
  romance: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=10749`,
  documentaries: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=99`,
  inTheaters: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22`
}

// Object Variables
export const movieURLArray = Object.values(movieURLS);
export const lastMovieInArray = movieURLArray.length - 1;
export const randomMovieURL = movieURLArray[Math.floor(Math.random() * lastMovieInArray)];

// Helper Functions
// Cut Off Long Strings of Text
export const truncate = (string:string,end:number) => {
  return string?.length > end ? string?.substring(0, end - 1) + `-` : string;
}

// Capitalize First Letter of Word
export const capitalizeWord = (word?:any) => {
  let capitalizedWord = word?.charAt(0)?.toUpperCase() + word?.slice(1);
  return capitalizedWord || word;
}

// Youtube Player Options
export const opts:any = {
  width: "100%",
  host: "https://www.youtube.com",
  height: "400",
  playerVars: {
    autoplay: 1,
  },
}

// Remove Duplicate Objects from Array
export const removeDuplicateObjFromArray = (array?:any) => {
  const uniqueArray = array?.filter((value?:any, index?:any) => {
      const _value = JSON.stringify(value);
      return index === array?.findIndex((obj?:any) => {
          return JSON.stringify(obj) === _value;
      });
  });
  return uniqueArray;
}

// State
export const getCurrentUser:any = localStorage.getItem(`User`);
export const currentUser:any = JSON.parse(getCurrentUser);

// Add Movie
export const addMovie = async (movie?:any, user?:any, setUser?:any) => {
  const movieName = movie?.name || movie?.title || movie?.original_name;
  console.log(`Add Movie`, movieName);
  const emailAddress = user?.email;
  const username = user?.username;
  const password = user?.password;
  user?.list?.push(movie);
  const list = user?.list;
  const reversedList = list?.reverse();
  setUser({
      username,
      password,
      email: emailAddress,
      list: removeDuplicateObjFromArray(reversedList)
  })
}

// Delete Movie
export const deleteMovie = async (movie?:any, user?:any, setUser?:any) => {
  const movieName = movie?.name || movie?.title || movie?.original_name;
  console.log(`Delete Movie`, movieName);
  const emailAddress = user?.email;
  const username = user?.username;
  const movieID = movie?.id;
  const filteredArray = user?.list?.filter((item?:any,index?:any) => item.id !== movieID);
  setUser({
    username,
    email: emailAddress,
    password: user?.password,
    list: removeDuplicateObjFromArray(filteredArray)
  })
}

// Update Movies
export const update = async (user?:any, setUser?:any, movie?:any, includes?:any) => {
  const getUser:any = localStorage.getItem(`User`);
  user = JSON.parse(getUser) || user;
  if (includes) {
      deleteMovie(movie, user, setUser);
  } else {
    addMovie(movie, user, setUser);
  }
  localStorage.setItem(`Last User`, JSON.stringify(user));
}

// App Begin
const App:React.FC = () => {

  const getUser:any = localStorage.getItem(`User`) || localStorage.getItem(`Last User`);
  const [user, setUser] = useState<any>(JSON.parse(getUser));
  const [movie, setMovie] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);

  useEffect(() => {

    const getLastUser:any = localStorage.getItem(`Last User`);
    const lastUser = JSON.parse(getLastUser);
    const body = document.body;
    // const x = (array?:any) => Math.floor(Math.random() * array.length);
    // const randomBanner:any = bannerMovies[x(bannerMovies)];
    if (user?.list?.length === 0) {
      body?.classList.remove(`items`);
      body?.classList.add(`empty`);
    } else {
      body?.classList.remove(`empty`);
      body?.classList.add(`items`);
    }
    console.log(`List`, user?.list);
    console.log(`User`, user);
    console.log(`Last User`, lastUser);

  }, [user])

  return (
    <div className={`App`}>
        <Router>
          {!user ? (
            <Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />
          ) : (
            <Routes>
              <Route path={`/`} element={<Home user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={ `/auth`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`/shows`} element={<TVShows user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={ `/signin`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`/tvshows`} element={<TVShows user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/tv-shows`} element={<TVShows user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={ `/sign-in`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`/movies`} element={<Movies user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={ `/login`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/log-in`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/signup`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/sign-up`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/register`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/registration`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={ `/authorization`} element={<Auth user={user} setUser={setUser} email={email} setEmail={setEmail} />} />
              <Route path={`/hot`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/new`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/latest`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/popular`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/trending`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/newpopular`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
              <Route path={`/new-popular`} element={<Latest user={user} setUser={setUser} movie={movie} setMovie={setMovie} />} />
            </Routes>
          )}
        </Router>
      </div>
  );  
}


export default App