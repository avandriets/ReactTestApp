import './UiStateLayout.scss';
import { Alert, Spinner } from 'react-bootstrap';
import BarLoader from 'react-bar-loader';
import Container from 'react-bootstrap/Container';
import { PropsStateLayout } from '@test-react-app/core';
import React from 'react';

export const UiStateLayout: React.FC<PropsStateLayout> = (props: PropsStateLayout) => {

  const { resolved, rejected, pending, updating } = props.children;
  const { state } = props;

  const showResolved = state.resolved;
  const showRejected = state.rejected;
  const showUpdating = showResolved && state.pending;
  const showPending = !showResolved && state.pending;

  const defaultRejected = <Alert variant={'danger'}>Error: {state.err}</Alert>;
  const defaultResolve = <pre>{state}</pre>;
  const defaultPending = <div className="d-flex justify-content-center mt-5">
    <Spinner className="mr-4" animation="grow" size="sm"/>
    <Spinner className="mr-4" animation="grow" size="sm"/>
    <Spinner className="mr-4" animation="grow" size="sm"/>
  </div>;
  const defaultUpdating = <BarLoader color="#1D8BF1" height="2"/>;

  return (
    <Container fluid className="ui-page-layout">

      {showPending ? pending ? pending : defaultPending : null}

      {showUpdating ? updating ? updating : defaultUpdating : null}

      {showResolved ? resolved ? resolved : defaultResolve : null}

      {showRejected ? rejected ? rejected : defaultRejected : null}

    </Container>
  );

};
