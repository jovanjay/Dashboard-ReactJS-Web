import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from './app/App';
import store from './app/Store';

/** Defaults */
import './index.css';

/** Bootstrap Core */
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

/** Overrides */
import './app/AppOverride.css';
import './app/App.css';


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

