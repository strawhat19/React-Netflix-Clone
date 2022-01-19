import * as React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { removeDuplicateObjFromArray } from './components/Banner/banner';
import Home from './components/Home/home';
import Auth from './components/Auth/auth';
import TVShows from './components/TVShows/tvshows';
import Movies from './components/Movies/movies';
import MyList from './components/MyList/mylist';
import Latest from './components/Latest/latest';
import './sass/App.css';

declare global { 
  interface State {
    user?: any,
    setUser?: any,
    list?: any,
    setList?: any,
    state?: any,
    setState?: any,
    movie?:any,
    setMovie?: any,
    bannerMovie?: any,
    [key: string]: any
  }
  interface Banner {
    user?: any,
    setUser?: any,
    fetchMovie?: any,
    list?: any,
    setList?: any,
    bannerMovie?: any,
    movies?: any,
    state?: any,
    setState?: any,
    movie?:any,
    setMovie?: any,
    [key: string]: any
  }
  interface Row {
    user?: any,
    setUser?: any,
    title: string,
    movieURL: string,
    movie?:any,
    setMovie?: any,
    state?: any,
    setState?: any,
    [key: string]: any
  }
}

export const defaultMovie:any = {
  "backdrop_path": "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg",
  "first_air_date": "2021-11-06",
  "genre_ids": [
      16,
      10765,
      10759,
      18
  ],
  "id": 94605,
  "name": "Arcane",
  "origin_country": [
      "US"
  ],
  "original_language": "en",
  "original_name": "Arcane",
  "overview": "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
  "popularity": 443.323,
  "poster_path": "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
  "vote_average": 9.1,
  "vote_count": 1557
}

export const addM = (movie?:any, user?:any, list?:any, setList?:any, setUser?:any, state?:any) => {
  console.log(`movie`,movie)
  list?.push(movie);
  const filteredList = removeDuplicateObjFromArray(list);
  setList(filteredList);
  setUser({
      ...user,
      list: filteredList
  })
}

export const deleteM = (movie?:any, user?:any, list?:any, setList?:any, setUser?:any, state?:any) => {
  console.log(`movie`,movie)
  const toDelete = list?.indexOf(movie);
  const newList = list?.splice(toDelete,1);
  const filteredList = removeDuplicateObjFromArray(newList);
  setList(filteredList);
  setUser({
      ...user,
      list: filteredList
  })
}
  
const App:React.FC = () => {
  
  const [list, setList] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [movie, setMovie] = useState<any>(null);
  const stateObj = {
    user,
    list,
  }
  const [state, setState] = useState<any>(stateObj);

    useEffect(() => {
      setState(stateObj);
      console.log(`state`,state);
      localStorage.setItem(`User`, JSON.stringify(user));
      localStorage.setItem(`List`, JSON.stringify(list));
      localStorage.setItem(`State`, JSON.stringify(state));
    },[user])

    return (
      <div className="App">
          <Router>
            {!user ? (
              <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
            ) : (
              <Routes>
                <Route path={`/`} element={
                  <Home user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                  } />
                <Route path={`/home`} element={
                  <Home user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                  } />
                <Route path={`/shows`} element={
                  <TVShows user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/tvshows`} element={
                  <TVShows user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/tv-shows`} element={
                  <TVShows user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/movies`} element={
                  <Movies user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/hot`} element={
                  <Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/new`} element={
                  <Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/latest`} element={
                  <Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/popular`} element={
                  <Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/trending`} element={
                  <Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/newpopular`} element={
                  <Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/new-popular`} element={
                  <Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/list`} element={
                  <MyList user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/mylist`} element={
                  <MyList user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={`/my-list`} element={
                  <MyList user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/auth`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/signin`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/sign-in`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/login`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/log-in`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/signup`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/sign-up`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/register`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/registration`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
                <Route path={ `/authorization`} element={
                  <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                } />
              </Routes>
            )}
          </Router>
        </div>
  );  
}


export default App