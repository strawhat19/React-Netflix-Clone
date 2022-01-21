import * as React from 'react';
import Piratechs from '../Piratechs/piratechs';
import "./styles/footer.css";

const Footer: React.FC = () => {
    const date = new Date();
    const year = date.getFullYear();
    
    return (
        <>
            <footer className={`footer red`}>
                <div className={`innerFooter`}>
                    <div className="nameText">
                        <a className="customLink hoverLink" href="https://github.com/strawhat19/react-netflix-clone" title="React Netflix Clone"><i className="fab fa-github"></i> | React Netflix Clone</a>
                    </div>
                    <div className="piratechs siteDesign hoverLink">
                        <a href="https://piratechs.com/" className="piratechsIcon"><Piratechs /></a>
                        <a href="https://piratechs.com/" className="piratechsLink">
                            Piratechs
                        </a>
                    </div>
                    <div className="siteText copyright" title="Copyright">
                        <a href="./" className="hoverLink">Copyright <i className="fas fa-copyright"></i> {year}</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer