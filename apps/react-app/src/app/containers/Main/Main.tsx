import React from 'react';

import { Jumbotron } from 'react-bootstrap';

import './Main.scss';

const main: React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <Jumbotron className="main">
        <h3>Welcome to products catalog application!</h3>
      </Jumbotron>
    </div>
  );
};

export default main;
