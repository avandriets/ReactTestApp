import { RootState } from '../../../../../../apps/react-app/src/app/store';

export const selectToggle = (state: RootState) => state.sideBarToggle.collapse;
