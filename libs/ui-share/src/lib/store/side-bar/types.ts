export const COLLAPSE_SIDE_BAR = 'COLLAPSE_SIDE_BAR';
export const EXPAND_SIDE_BAR = 'EXPAND_SIDE_BAR';

export interface ToggleSideBar {
  collapse: boolean;
}

interface CollapseSideBarAction {
  type: typeof COLLAPSE_SIDE_BAR;
  payload: ToggleSideBar;
}

interface ExpandSideBarAction {
  type: typeof EXPAND_SIDE_BAR;
  payload: ToggleSideBar;
}

export interface ToggleState {
  collapse: boolean;
}

export type ToggleSideBarTypes = CollapseSideBarAction | ExpandSideBarAction;
