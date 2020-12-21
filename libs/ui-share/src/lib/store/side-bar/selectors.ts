import { RootState } from '@test-react-app/core';

export const selectToggle = (state: RootState) => state.sideBarToggle.collapse;
