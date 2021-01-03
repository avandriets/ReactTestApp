import { AuthConsumer, AuthContext, AuthService } from '@test-react-app/core';
import { Button, Nav, Navbar } from 'react-bootstrap';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { User } from 'oidc-client';

export const NavBar: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);

  const authContext = useContext<AuthService>(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      try {
        if (authContext.isAuthenticated()) {
          const fetchedUser: User = await authContext.getUser();
          setUser(fetchedUser);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  return (
    <Navbar bg="light" expand="lg">

      <LinkContainer to="/">
        <Navbar.Brand>Products catalog</Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav"/>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav activeKey={window.location.pathname} className="mr-auto">
          <LinkContainer to="/dictionaries">
            <Nav.Link>Dictionaries</Nav.Link>
          </LinkContainer>
        </Nav>
        <AuthConsumer>
          {({ signinRedirect, logout, isAuthenticated }) => {
            return <Fragment>
              <span className="mr-3">{user?.profile?.email}</span>
              {isAuthenticated() ?
                <Button onClick={logout} className="mr-3">Logout</Button> :
                <Button onClick={signinRedirect}>Login</Button>
              }
            </Fragment>;
          }}
        </AuthConsumer>
      </Navbar.Collapse>

    </Navbar>
  );
};

export default NavBar;
