import './PageLayout.scss';
import React, { ReactNode } from 'react';
import Container from 'react-bootstrap/Container';

export interface NamedSlots {
  title?: ReactNode
  breadcrumb?: ReactNode
  action?: ReactNode
  body?: ReactNode
}

export interface PropsPageLayout {
  children?: NamedSlots;
}

export const PageLayout: React.FC = (props: PropsPageLayout) => {

  const {title, breadcrumb, action, body } = props.children;

  return (
    <Container fluid className="page-layout">
      { breadcrumb ? <div className="mb-3">{breadcrumb}</div> : null }
      <div className="d-flex justify-content-between mb-3">
        { title ? title : null }
        { action ? action : null }
      </div>
      { body ? <div className="mb-3">{body}</div> : null }
    </Container>
  );

};
