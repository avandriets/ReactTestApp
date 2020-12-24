import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import React from 'react';

export const navBar: React.FC = () => {
  return(
    <Navbar bg="light" expand="lg">

      <LinkContainer to="/">
        <Navbar.Brand>Products catalog</Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav activeKey={window.location.pathname} className="mr-auto">
          <LinkContainer to="/dictionaries">
            <Nav.Link >Dictionaries</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
};

export default navBar;
