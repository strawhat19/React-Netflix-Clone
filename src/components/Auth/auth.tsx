import './styles/auth.css';
import 'react-slidy/lib/styles.css';

import * as React from 'react';
import 'react-slidy/lib/styles.css';
// import { state } from '../../App';
import ReactSlidy from 'react-slidy';
import Header from '../Header/header';
// import { useContext } from 'react';
import Footer from '../Footer/footer';
import GetStarted from './getstarted';
import Registration from './registration';

const Auth:React.FC<State> = ({user, setUser, email, setEmail}) => {
    // const { activeAuthSlideIndex } = useContext<any>(state);
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