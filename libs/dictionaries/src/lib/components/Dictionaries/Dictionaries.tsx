import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { selectToggle, SideBar } from '@test-react-app/ui-share';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import DictionariesDashboard from '../DictionariesDashboard/DictionariesDashboard';
import { Layout } from '@test-react-app/ui-share';
import { ProductList } from '@test-react-app/ui-products';

import './Dictionaries.scss';
import { useSelector } from 'react-redux';

export const Dictionaries: React.FC = () => {
  const collapsed = useSelector(selectToggle);

  const navLink = <Nav.Link>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags"
         viewBox="0 0 16 16">
      <path fillRule="evenodd"
            d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
      <path fillRule="evenodd"
            d="M5.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
      <path
        d="M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
    </svg>
    <span className="ml-2">{collapsed ? null : 'Products'}</span>
  </Nav.Link>;

  return (
    <div className="d-flex flex-row">

      <SideBar>
        <LinkContainer to="/dictionaries/products">
          {navLink}
        </LinkContainer>
      </SideBar>

      <Layout>
        <Switch>
          <Route path="/dictionaries" exact component={DictionariesDashboard}/>
          <Route path="/dictionaries/products" exact component={ProductList}/>
          <Redirect to="/404" />
        </Switch>
      </Layout>

    </div>
  );

};
