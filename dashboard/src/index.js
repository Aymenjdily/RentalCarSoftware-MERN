import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { CarContextProvider } from './context/CarContext';
import { ClientsContextProvider } from './context/ClientsContext';
import { PlaceContextProvider } from './context/placeContext';
import { FeedbackContextProvider } from './context/FeedbackContext';
import { InformationContextProvider } from './context/InformationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClientsContextProvider>
      <CarContextProvider>
        <PlaceContextProvider>
          <FeedbackContextProvider>
            <InformationContextProvider>
              <App />
            </InformationContextProvider>
          </FeedbackContextProvider>
        </PlaceContextProvider>
      </CarContextProvider>
    </ClientsContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
