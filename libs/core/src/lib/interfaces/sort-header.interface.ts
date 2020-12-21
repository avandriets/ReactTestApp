export interface SortHeaderInterface {
  title: string;
  apiField: string;
  sortable: boolean;
  currentSortField?: string;
  onPress?: (field: string) => void;
}
