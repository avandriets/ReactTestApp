import { Route, Switch } from 'react-router-dom';
import { Dictionaries } from '@test-react-app/dictionaries';
import Main from './containers/Main/Main';
import { NotFound } from '@test-react-app/ui-share';
import React from 'react';

export const Routes = (
  <Switch>
    <Route path="/" exact component={Main}/>
    <Route path="/dictionaries" component={Dictionaries}/>
    <Route path="/404" component={NotFound}/>
    <Route path="*" component={NotFound}/>
  </Switch>
);
