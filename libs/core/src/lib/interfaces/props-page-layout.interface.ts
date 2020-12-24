import { ReactNode } from 'react';

export interface NamedSlots {
  title?: ReactNode;
  breadcrumb?: ReactNode;
  action?: ReactNode;
  body?: ReactNode;
}

export interface PropsPageLayout {
  children?: NamedSlots;
}
