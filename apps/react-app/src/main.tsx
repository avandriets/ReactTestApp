import { App } from './app/app';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
