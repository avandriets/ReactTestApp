import './Main.scss';
import { Jumbotron } from 'react-bootstrap';
import React from 'react';

const main: React.FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <Jumbotron className="main d-flex justify-content-center">
        <h3>Products catalog application.</h3>
      </Jumbotron>
    </div>
  );
};

export default main;
