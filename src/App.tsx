import * as React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/home';
import Auth from './components/Auth/auth';
import './sass/App.css';
import TVShows from './components/TVShows/tvshows';
import Movies from './components/Movies/movies';
import MyList from './components/MyList/mylist';
import Latest from './components/Latest/latest';

declare global { 
  interface State {
    user?: any,
    setUser?: any,
    list?: any,
    setList?: any,
    state?: any,
    setState?: any,
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
    [key: string]: any
  }
  interface Row {
    user?: any,
    setUser?: any,
    title: string,
    movieURL: string,
    state?: any,
    setState?: any,
    [key: string]: any
  }
}
  
const App:React.FC = () => {
  
  const getUser:any = localStorage.getItem(`User`);
  const getState:any = localStorage.getItem(`State`);
  const getList:any = JSON.parse(getState)?.list;
  const [list, setList] = useState<any>(getList || []);
  const [user, setUser] = useState<any>(JSON.parse(getUser));
  const [state, setState] = useState<any>(JSON.parse(getState) || {
    user,
    list
  });

    useEffect(() => {
      // const listItems:any = document.querySelector(`#listItems`);
      // listItems.innerHTML = list?.length;
      // console.log(listItems)
      setState({
        user,
        list
      });
      localStorage.setItem(`User`, JSON.stringify(user));
      localStorage.setItem(`List`, JSON.stringify(list));
      localStorage.setItem(`State`, JSON.stringify(state));
      console.log(`user`,user);
      console.log(`state`,state);
      console.log(`list`,list);
    },[user, list])

    return (
      <div className="App">
          <Router>
            {!user ? (
              <Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />
            ) : (
              <Routes>
                <Route path={`/`} element={<Home user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/home`} element={<Home user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/shows`} element={<TVShows user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/tvshows`} element={<TVShows user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/tv-shows`} element={<TVShows user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/movies`} element={<Movies user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/hot`} element={<Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/new`} element={<Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/latest`} element={<Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/popular`} element={<Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/trending`} element={<Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/newpopular`} element={<Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/new-popular`} element={<Latest user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/list`} element={<MyList user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/mylist`} element={<MyList user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={`/my-list`} element={<MyList user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/auth`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/signin`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/sign-in`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/login`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/log-in`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/signup`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/sign-up`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/register`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/registration`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
                <Route path={ `/authorization`} element={<Auth user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />} />
              </Routes>
            )}
          </Router>
        </div>
  );  
}


export default App