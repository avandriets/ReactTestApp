import './Layout.scss';
import Container from 'react-bootstrap/Container';
import { PropsInterface } from '@test-react-app/core';
import React from 'react';

export const Layout: React.FC = (props: PropsInterface) => {
  return (
    <Container fluid className="Layout">
      { props.children }
    </Container>
  );
};
