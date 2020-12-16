import React from 'react';
import Container from 'react-bootstrap/Container';

import { Aux } from '../hoc/Aux';

import './Layout.scss';

export const Layout: React.FC = (props: { children }) => {
  return (
    <Aux>
      <Container fluid className="Layout">
        { props.children }
      </Container>
    </Aux>
  );
};
