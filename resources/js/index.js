import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import store from './store/index';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser, setUser } from './actions/authentication';
import history from './history';
import 'react-dates/lib/css/_datepicker.css';

if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken);
    store.dispatch(setUser());
    history.push('/dashboard');
    // TODO: Check token created at and log user out
} else {
    store.dispatch(setUser());
}

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <AppRouter />
        </Provider>,
        document.getElementById('root')
    );
}
