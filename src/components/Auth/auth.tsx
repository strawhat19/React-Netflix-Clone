import * as React from 'react';
import { Button } from '@mui/material';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Signup from '../SignUpForm/signup';
import TopButton from '../TopButton/topbutton';
import './styles/auth.css'

interface Props {
    user?: any,
    setUser?: any,
    [key: string]: any
}

const Auth:React.FC<Props> = ({user, setUser}) => {

    const newUser = (emailAddress?:any) => {
        const emailBeforeString = emailAddress?.substring(0, emailAddress.indexOf("@"));
        const emailAfterstring = emailAddress?.replace(emailBeforeString+`@`,``);
        if (emailBeforeString.length === 0 || emailAfterstring.length === 0) {
            alert(`Please Enter Something Before & After the '@' Symbol As Well`)
            return
        } else {
            const userObj = {
                list: [],
                email: emailAddress,
                username: emailBeforeString
            }
            setUser(userObj)
            localStorage.setItem(`User`, JSON.stringify(userObj));
        }
    }

    return (
        <>
        <Header />
        <TopButton />
        <main className="auth">
            <div className="innerAuth">
                {!user ? (
                    <div className="initialAuth">
                        <h1 className={`authHeader`}>Unlimited films, TV programs and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <form action="" className="authForm">
                            <input type="email" className="email" placeholder="Email Address" />
                            <Button title="Sign Up"
                                className='formButton'
                                onClick={() => {
                                    // On Form Submit Code
                                    // const emailAddressField = document.querySelector(`input`);
                                    const emailAddress = document.querySelector(`input`)?.value;
                                    
                                    emailAddress?.includes(`@`) ? emailAddress?.length < 2 ? alert(`lease Enter An Email Address With More Characters`) : newUser(emailAddress) : alert(`Please Enter An Email Address With An '@' Symbol`);
                                }}
                                style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `500`
                                }}>
                                    GET STARTED
                            </Button>
                        </form>
                    </div>
                ) : (
                    <Signup />
                )}
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Auth