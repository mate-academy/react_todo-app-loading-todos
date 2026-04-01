export const FILTER_TYPE = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
} as const;

export const ERROR_TYPE = {
  LOAD: 'loadError',
  TITLE: 'titleError',
  ADD: 'addError',
  DELETE: 'deleteError',
  UPDATE: 'updateError',
  NONE: 'none',
} as const;
