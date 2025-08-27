export interface CellConfig {
  // Field to display as label (text)
  labelField?: string;
  // Field containing the image URL
  imageField?: string;
}

export interface FilterConfig {
  visible: boolean;
  type: 'basic' | 'advanced';
}

export interface ColumnConfig {
  // The field name to display (used for sorting and filtering)
  field: string;
  // The header label to display in the table column header
  header: string;
  // Enables sorting on this column
  sortable?: boolean;
  // Optionally specify a custom filter
  filterConfig?: FilterConfig;
  // Optionally specify a custom template for rendering the cell
  cellConfig?: CellConfig;
}

export interface ActionConfig {
  // The icon associated with the action (e.g., "pi pi-pencil")
  icon: string;
  // Optional label for the action
  label?: string;

  severity?: 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;

  // Array of permissions required to display the action (at least one must be satisfied)
  permissions?: string[];

  // Callback function executed on action click, receiving the row data
  callback: (row?: any) => void;
}

export interface TableConfig {
  // Table title
  title?: string;
  // Placeholder text for the global search input
  searchPlaceholder?: string;
  // Array of columns to display in the table
  columns: ColumnConfig[];
  // Data to display in the table
  data: any[];
  // Enables pagination
  paginator?: boolean;
  // Number of rows to display per page
  rows?: number;
  // Array of fields for global filtering (e.g., ['username', 'email'])
  globalFilterFields?: string[];
  // Callback function executed on add button click
  addAction?: ActionConfig;
  // Array of actions to display for each row
  actions?: ActionConfig[];
  // Search form configuration
  searchFormEntity?: string;
}

export const initialTableConfigState: TableConfig = {
  columns: [],
  data: [],
  paginator: false,
  rows: 10,
  globalFilterFields: [],
  actions: [],
};
