import {
  COLLAPSE_SIDE_BAR,
  EXPAND_SIDE_BAR,
  ToggleSideBarTypes,
  ToggleState,
} from './types';

const initialState: ToggleState = {
  collapse: false,
}

export function toggleSideBarReducer(
  state = initialState,
  action: ToggleSideBarTypes
): ToggleState {
  switch (action.type) {
    case COLLAPSE_SIDE_BAR:
      return {
        ...state,
        collapse: action.payload.collapse,
      }
    case EXPAND_SIDE_BAR:
      return {
        ...state,
        collapse: action.payload.collapse,
      }
    default:
      return state;
  }
}
