import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Register from '../components/Register';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import DashboardPage from '../components/DashboardPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={DashboardPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
