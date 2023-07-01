export enum FilterType {
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
  ALL = 'ALL',
}

export enum ErrorType {
  DATALOADING = 'DATALOADING',
}

export interface TodosInfo {
  length: number,
  countOfActive: number,
  someCompleted: boolean,
}
