import React, { Dispatch, useState } from 'react';

import './SideBar.scss';

import { Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { collapseSideBar, expandSideBar, selectToggle } from '../../store';

const rightArrowIcon =
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right"
       viewBox="0 0 16 16">
    <path fillRule="evenodd"
          d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
  </svg>;

const leftArrowIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           className="bi bi-caret-left" viewBox="0 0 16 16">
  <path fillRule="evenodd"
        d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
</svg>;

type Props = {
  children: any;
}

export const SideBar: React.FC<Props> = ({ children }) => {
  const collapsedState = useSelector(selectToggle);
  const dispatch: Dispatch<any> = useDispatch();
  const [collapsed, setCollapsed] = useState(collapsedState);

  const onToggleClick = React.useCallback(() => {
    setCollapsed(!collapsed);

    dispatch(!collapsed ? collapseSideBar({ collapse: true }) : expandSideBar({ collapse: false }));

  }, [collapsed, dispatch]);

  const classes = `SideBar ${collapsed ? 'collapsed' : 'expanded'} d-flex align-items-start flex-column`;
  const icon = collapsed ? rightArrowIcon : leftArrowIcon;

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
