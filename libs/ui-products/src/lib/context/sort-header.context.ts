import { Context, createContext } from 'react';
import { SortContext } from '@test-react-app/core';

export class SFContext implements SortContext {

  public sortDirection: string | null;
  public sortField: string | null;

  public offset: string | null;
  public limit: string | null;

  public constructor() {
    this.toggleSort = this.toggleSort.bind(this);
    this.init = this.init.bind(this);
  }

  public toggleSort(field: string | undefined, direction: string | undefined): void {
    this.sortDirection = this.sortField === field ? direction : 'asc';
    this.sortDirection = direction;
    this.sortField = field;
  }

  public init(urlSearch: string): void {
    const query = new URLSearchParams(urlSearch);

    this.sortField = query.get('sort_field') || '';
    this.offset = query.get('offset') || '';
    this.limit = query.get('limit') || '';
    this.sortDirection = query.get('sort') || '';

  }

}

export const SortHeaderContext: Context<SFContext> = createContext<SFContext>(new SFContext());
