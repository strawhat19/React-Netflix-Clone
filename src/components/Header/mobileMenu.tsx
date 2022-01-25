import * as React from 'react';
import Button from '@mui/material/Button';
import { capitalizeWord } from '../../App';
import Dashboard from '../Dashboard/dashboard';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const date = new Date();
const year = date.getFullYear();

const MobileMenu: React.FC<State> = ({user, setUser}) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
            <ul className="dash buttons mobileDash"> 
                <Dashboard user={user} setUser={setUser} />
                <div className="user" title='User Settings' onClick={toggleDrawer(anchor, true)}>
                    <div className="customAvatar">
                        <span className="avatarLetter">{capitalizeWord(user?.email?.split(``)[0])}</span>
                    </div>
                    <span className="caret" role="presentation"><i className="fas fa-caret-down"></i></span>
                    <div className="logout">
                        <p>Log out, {capitalizeWord(user?.username)}?</p>
                        <Button onClick={toggleDrawer(anchor, true)}
                            className='logoutButton'
                            title="Open Menu"
                            style={{
                                color: `white`,
                                textTransform: `none`,
                                fontWeight: `600`
                            }}>
                                <i className="fas fa-bars"></i> Open Menu
                        </Button>
                        <Button onClick={(event) => {
                                setUser(null);
                            }}
                            className='logoutButton'
                            title="Log Out"
                            style={{
                                color: `white`,
                                textTransform: `none`,
                                fontWeight: `600`
                            }}>
                                <i className="fas fa-sign-out-alt"></i> Logout
                        </Button>
                    </div>
                </div>
            </ul>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <ul className='drawerDash'>
                <Link to={'/'}>
                    <a title="Home" className="homeLink" href="./">
                        <LazyLoadImage effect="blur" src={`https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixLogo.png`} id={`logo`} className="logo" alt={`logo`} width={`120px`} height={`auto`} />
                    </a>
                </Link>
                <li className="navigation-tab firstLink">
                    <Link to={'/'}>
                        <a className="current active hoverLink" href="./"><i className="fas fa-home"></i> Home</a>
                    </Link>
                </li>
                <li className="navigation-tab">
                    <Link to={'/shows'}>
                        <a className="hoverLink" href="./shows"><i className="fas fa-tv"></i> TV Shows</a>
                    </Link>
                </li>
                <li className="navigation-tab">
                    <Link to={'/movies'}>
                        <a className="current active hoverLink" href="./movies"><i className="fas fa-film"></i> Movies</a>
                    </Link>
                </li>
                <li className="navigation-tab">
                    <Link to={'/latest'}>
                        <a className="hoverLink" href="./latest"><i className="fas fa-star-half-alt"></i> New &amp; Popular</a>
                    </Link>
                </li>
            </ul>
            <div className="drawerDash drawerFooter">
                <div className="nameText">
                    <a className="customLink hoverLink" href="https://github.com/strawhat19/react-netflix-clone" title="React Netflix Clone"><i className="fab fa-github"></i> Netflix Clone</a>
                </div>
                <div className="siteText copyright" title="Copyright">
                    <a href="./" className="hoverLink"><i className="fas fa-copyright"></i> {year}</a>
                </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default MobileMenu