import './Dictionaries.scss';
import { Layout, SideBar, productIcon, selectToggle } from '@test-react-app/ui-share';
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from 'react-bootstrap';
import React from 'react';
import { Routes } from '../../routes';
import { useSelector } from 'react-redux';

export const Dictionaries: React.FC = () => {
  const collapsed = useSelector(selectToggle);

  const navLink = <Nav.Link>
    {productIcon}
    <span className="ml-2">{collapsed || 'Products'}</span>
  </Nav.Link>;

  return (
    <div className="d-flex flex-row">

      <SideBar>
        <LinkContainer to="/dictionaries/products">
          {navLink}
        </LinkContainer>
      </SideBar>

      <Layout>
        {Routes}
      </Layout>

    </div>
  );

};
