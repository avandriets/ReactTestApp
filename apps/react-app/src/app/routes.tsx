import {
  Callback,
  Logout,
  LogoutCallback,
  PrivateRoute,
  SilentRenew,
} from '@test-react-app/core';
import { Route, Switch } from 'react-router-dom';
import { Dictionaries } from '@test-react-app/dictionaries';
import Main from './containers/Main/Main';
import { NotFound } from '@test-react-app/ui-share';
import React from 'react';

export const Routes = (
  <Switch>
    <Route exact={true} path="/signin-oidc" component={Callback}/>
    <Route exact={true} path="/logout" component={Logout}/>
    <Route exact={true} path="/logout/callback" component={LogoutCallback}/>
    <Route exact={true} path="/silentrenew" component={SilentRenew}/>

    <Route path="/" exact component={Main}/>
    <PrivateRoute path="/dictionaries" component={Dictionaries} />
    {/*<Route path="/dictionaries" component={Dictionaries}/>*/}
    <Route path="/404" component={NotFound}/>
    <Route path="*" component={NotFound}/>
  </Switch>
);
