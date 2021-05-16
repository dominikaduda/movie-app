import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ShowMovieItem from '../components/ShowMovieItem';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/favourites" component={NotFoundPage} />
        <PrivateRoute path="/editprofile" component={NotFoundPage} />
        <PrivateRoute path="/movie/:id" component={ShowMovieItem} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
