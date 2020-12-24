import './DictionariesDashboard.scss';
import { Jumbotron } from 'react-bootstrap';
import React from 'react';

export function DictionariesDashboard() {
  return (
    <div className="d-flex justify-content-center">
      <Jumbotron className="dashboard d-flex justify-content-center">
        <h3>Select dictionary for editing data.</h3>
      </Jumbotron>
    </div>
  );
}

export default DictionariesDashboard;
