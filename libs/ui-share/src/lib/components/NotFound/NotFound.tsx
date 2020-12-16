import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.scss';
import { Alert, Button } from 'react-bootstrap';

export const NotFound: React.FC = () => {

  return (
    <Alert variant="danger" className="m-2">
      <Alert.Heading>404 Page not found!</Alert.Heading>
      <p>
        Page does not exists.
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="link">
          <Link to="/">Go to Home </Link>
        </Button>
      </div>
    </Alert>
  );
};
