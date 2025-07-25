import { FilterTypes } from '../types/FilterTypes';

const Filters = [
  { label: 'All', value: FilterTypes.All, cy: 'FilterLinkAll', href: '#/' },
  {
    label: 'Active',
    value: FilterTypes.Active,
    cy: 'FilterLinkActive',
    href: '#/active',
  },
  {
    label: 'Completed',
    value: FilterTypes.Completed,
    cy: 'FilterLinkCompleted',
    href: '#/completed',
  },
];

export default Filters;
