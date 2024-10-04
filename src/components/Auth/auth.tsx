import './styles/auth.css';
import 'react-slidy/lib/styles.css';

import * as React from 'react';
import 'react-slidy/lib/styles.css'
import ReactSlidy from 'react-slidy';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import GetStarted from './getstarted';
import Registration from './registration';

const Auth:React.FC<State> = ({user, setUser, email, setEmail}) => {
    return (
        <div className='authCont'>
            <Header user={user} setUser={setUser} />
            <main className="auth">
                <ReactSlidy infiniteLoop>
                    <GetStarted setEmail={setEmail} />
                    <Registration user={user} setUser={setUser} email={email} />
                </ReactSlidy>
            </main>
            <Footer />
        </div>
    )
}

export default Auth