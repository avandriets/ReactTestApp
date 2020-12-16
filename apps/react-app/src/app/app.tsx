import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dictionaries } from '@test-react-app/dictionaries';
import { Layout, NotFound } from '@test-react-app/ui-share';

import NavBar from './components/NavBar/NavBar';
import Main from './containers/Main/Main';

import './app.scss';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <NavBar/>

          <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/dictionaries" component={Dictionaries}/>
            <Route path="/404" component={NotFound}/>
            <Route path="*" component={NotFound}/>
          </Switch>

        </Layout>
      </BrowserRouter>
    );
  }

}
