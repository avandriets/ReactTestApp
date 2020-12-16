import {
  COLLAPSE_SIDE_BAR,
  EXPAND_SIDE_BAR,
  ToggleSideBar,
  ToggleSideBarTypes,
} from './types';

export function collapseSideBar(toggle: ToggleSideBar): ToggleSideBarTypes {
  return {
    type: COLLAPSE_SIDE_BAR,
    payload: toggle,
  }
}

export function expandSideBar(toggle: ToggleSideBar): ToggleSideBarTypes {
  return {
    type: EXPAND_SIDE_BAR,
    payload: toggle,
  }
}
