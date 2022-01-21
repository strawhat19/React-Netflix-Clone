import * as React from 'react';
import ReactSlidy from 'react-slidy';
import 'react-slidy/lib/styles.css'
import Header from '../Header/header';
import Footer from '../Footer/footer';
import GetStarted from './getstarted';
import Registration from './registration';
import './styles/auth.css';

const Auth:React.FC<State> = ({user, setUser, email, setEmail}) => {

    return (
        <>
        <Header user={user} setUser={setUser} />
        <main className="auth">
            <ReactSlidy infiniteLoop>
                <GetStarted setEmail={setEmail} />
                <Registration user={user} setUser={setUser} email={email} />
            </ReactSlidy>
        </main>
        <Footer />
        </>
    )
}

export default Auth