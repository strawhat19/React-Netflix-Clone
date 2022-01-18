import * as React from 'react';
import "./styles/customAvatar.css";
import { capitalize } from '../Header/header';

const CustomAvatar: React.FC<State> = ({user, setUser}) => {
    const firstUserLetter = user?.username[0];
    return (
        <>
        {user ? (
            <div className="customAvatar">
                <span className="avatarU">{capitalize(firstUserLetter)}</span>
            </div>
        ) : (
            <img alt="avatar" src="./assets/avatarEdit.svg" className="customAvatar" />
        )}
        </>    
    )
}

export default CustomAvatar
