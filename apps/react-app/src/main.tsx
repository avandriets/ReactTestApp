import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app/app';
import { Provider } from 'react-redux';
import { store } from '@test-react-app/core';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
