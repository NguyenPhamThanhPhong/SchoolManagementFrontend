import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import GlobalStyles from './style/GlobalStyle';

import { DataStoreProvider } from './data-store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DataStoreProvider>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </DataStoreProvider>
);

