import * as React from 'react'
// import { useEffect, useState, useContext, Suspense, lazy } from 'react'
import Header from '../Header/header';
import TopButton from '../TopButton/topbutton';
import Footer from '../Footer/footer';
import Main from '../Main/main';

interface Props {
    user?: any,
    setUser?: any,
    [key: string]: any
}

const MyList: React.FC<Props> = ({user, setUser}) => {
    return (
        <div className="myList">
            <Header user={user} setUser={setUser} />
            <div className="spacer" style={{
                height: `200px`,
                color: `white`,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`
            }}>
                <span className="myList">Hello This is My List</span>
            </div>
            <Main />
            <TopButton />
            <Footer />
        </div>
    )
}   

export default MyList