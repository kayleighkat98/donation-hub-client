import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { HubProvider} from './contexts/HubContext'
import { GoogleProvider} from './contexts/GoogleContext'
import App from '../src/components/App/App';
import './index.css';

window.initMap = () => {
  window.markers = [];
  window.map = new window.google.maps.Map(document.getElementById('maps-root'), {
    center: {lat: -34.397, lng: 150.644},
    disableDefaultUI: true,
    gestureHandling: 'greedy',
    zoom: 8,
  });
  ReactDOM.render(
    <BrowserRouter>
      <UserProvider>
        <HubProvider>
          <GoogleProvider>
            <App />
          </GoogleProvider>
        </HubProvider>
      </UserProvider>
    </BrowserRouter>,
    document.getElementById('react-root'),
  );
}
