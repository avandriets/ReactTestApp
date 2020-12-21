import { Redirect, Route, Switch } from 'react-router-dom';
import DictionariesDashboard from './components/DictionariesDashboard/DictionariesDashboard';
import { ProductList } from '@test-react-app/ui-products';
import React from 'react';

export const Routes = (
  <Switch>
    <Route path="/dictionaries" exact component={DictionariesDashboard}/>
    <Route path="/dictionaries/products" exact component={ProductList}/>
    <Redirect to="/404" />
  </Switch>
);
