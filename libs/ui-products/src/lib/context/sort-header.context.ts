import { Context, createContext } from 'react';
import { SortContext } from '@test-react-app/core';

export class SFContext implements SortContext {

  public sortDirection: string | null;
  public sortField: string | null;

  public constructor() {
    this.toggleSort = this.toggleSort.bind(this);
  }

  public toggleSort(field: string | undefined, direction: string | undefined): void {
    this.sortDirection = this.sortField === field ? direction : 'asc';
    this.sortDirection = direction;
    this.sortField = field;
  }

}

export const SortHeaderContext: Context<Partial<SortContext>> = createContext<Partial<SortContext>>(new SFContext());
