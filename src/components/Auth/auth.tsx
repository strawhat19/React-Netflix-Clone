import * as React from 'react';
// import { useEffect, useState, useContext, Suspense, lazy } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import TopButton from '../TopButton/topbutton';
import './styles/auth.css'

const Auth:React.FC = () => {
    return (
        <>
        <Header />
        <TopButton />
        <main className="auth">
            <div className="innerAuth">
                <h1 className={`authHeader`}>Unlimited films, TV programs and more.</h1>
                <h2>Watch anywhere. Cancel at any time.</h2>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Auth