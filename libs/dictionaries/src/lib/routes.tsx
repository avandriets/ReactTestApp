import { ProductDetails, ProductList } from '@test-react-app/ui-products';
import { Redirect, Route, Switch } from 'react-router-dom';
import DictionariesDashboard from './components/DictionariesDashboard/DictionariesDashboard';
import React from 'react';

export const Routes = (
  <Switch>
    <Route path="/dictionaries" exact component={DictionariesDashboard}/>
    <Route path="/dictionaries/products" exact component={ProductList}/>
    <Route path="/dictionaries/products/:id" exact component={ProductDetails}/>
    <Redirect to="/404" />
  </Switch>
);
