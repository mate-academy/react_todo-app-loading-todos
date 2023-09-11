import { Status } from '../types/filterStatusENUM';

export const linkOptions = [
  { path: '#/', filterValue: Status.All, label: 'All' },
  { path: '#/active', filterValue: Status.Acctive, label: 'Active' },
  { path: '#/completed', filterValue: Status.Completed, label: 'Completed' },
];
