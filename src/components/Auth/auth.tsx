import * as React from 'react';
import { useEffect, useState, useContext, Suspense, lazy } from 'react';
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
            Auth
        </main>
        <Footer />
        </>
    )
}

export default Auth