import './SideBar.scss';
import { Button, Nav } from 'react-bootstrap';
import React, { Dispatch, useState } from 'react';
import { arrowLeft, arrowRight } from '../../svg';
import { collapseSideBar, expandSideBar, selectToggle } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { PropsInterface } from '@test-react-app/core';

export const SideBar: React.FC<PropsInterface> = ({ children }) => {

  const collapsedState = useSelector(selectToggle);
  const dispatch: Dispatch<any> = useDispatch();

  const [collapsed, setCollapsed] = useState(collapsedState);

  const onToggleClick = React.useCallback(() => {
    setCollapsed(!collapsed);

    dispatch(!collapsed ? collapseSideBar({ collapse: true }) : expandSideBar({ collapse: false }));

  }, [collapsed, dispatch]);

  const classes = `SideBar ${collapsed ? 'collapsed' : 'expanded'} d-flex align-items-start flex-column`;
  const icon = collapsed ? arrowRight : arrowLeft;

  return (
    <nav className={classes}>

      <Nav className="flex-column flex-fill w-100">
        {children}
      </Nav>

      <div className="d-flex justify-content-end w-100 pr-1">

        <Button variant="link" onClick={onToggleClick}>
          {icon}
        </Button>

      </div>

    </nav>
  );

}
