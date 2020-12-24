import './PageLayout.scss';
import Container from 'react-bootstrap/Container';
import { PropsPageLayout } from '@test-react-app/core';
import React from 'react';

export const PageLayout: React.FC<PropsPageLayout> = (props: PropsPageLayout) => {

  const { title, breadcrumb, action, body } = props.children;

  return (
    <Container fluid className="page-layout">
      {breadcrumb ? <div className="mb-3">{breadcrumb}</div> : null}
      <div className="d-flex justify-content-between mb-3">
        {title ? title : null}
        {action ? action : null}
      </div>
      {body ? <div className="mb-3">{body}</div> : null}
    </Container>
  );

};
