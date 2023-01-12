import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import HashConnectProvider from './api/HashConnectAPIProvider.tsx';
import { HashConnect } from 'hashconnect';
const hashConnect = new HashConnect(true);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashConnectProvider hashConnect={hashConnect} debug>
    <App />
  </HashConnectProvider>
);
