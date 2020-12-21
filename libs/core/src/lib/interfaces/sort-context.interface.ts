export interface SortContext {
  sortField: string | null;
  sortDirection: string | null;
  toggleSort?: (field?: string, direction?: string) => void;
}
