import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader: React.FC = () => {

  return <div className="d-flex justify-content-center align-items-center mt-5">
    <Spinner animation="border" className="mr-3"/>
    <div className="d-flex align-items-center">Loading...</div>
  </div>;

};
