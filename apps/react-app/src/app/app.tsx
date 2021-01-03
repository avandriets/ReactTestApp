import './app.scss';
import React, { Component } from 'react';
import { AuthProvider } from '@test-react-app/core';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@test-react-app/ui-share';
import NavBar from './components/NavBar/NavBar';
import { Routes } from './routes';

export class App extends Component {

  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <NavBar/>
            {Routes}
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    );
  }

}
