import * as React from 'react';
import ReactDOM from 'react-dom';
import App, { logs } from './App';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'person-info': PersonInfoProps
    }
  }
}

interface PersonInfoProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  heading: string,
  subHeading: string,
  size?: string,
}

if (`serviceWorker` in navigator) {
  window.addEventListener(`load`, () => {
    navigator.serviceWorker
      .register(`/service-worker.js`)
      .then((registration) => {
        logs && console.log(`Service Worker Registered`, registration);
      })
      .catch((error) => {
        console.log(`Service Worker Registration Error`, error);
      });
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);