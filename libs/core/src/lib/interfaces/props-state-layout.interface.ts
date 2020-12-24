import { ReactNode } from 'react';
import { Status } from './status.interface';

export interface StateSlots {
  resolved?: ReactNode;
  rejected?: ReactNode;
  pending?: ReactNode;
  updating?: ReactNode;
}

export interface PropsStateLayout {
  children?: StateSlots;
  state: Status;
}
