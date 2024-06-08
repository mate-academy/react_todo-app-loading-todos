import React from 'react';
import { Filter } from '../types/Filter';

export const FilterLink: React.FC<{
  filter: Filter;
  currentFilter: Filter;
  setFilter: (filter: Filter) => void;
  label: string;
  dataCy: string;
}> = ({ filter, currentFilter, setFilter, label, dataCy }) => (
  <a
    href={`#/${filter}`}
    className={`filter__link ${currentFilter === filter ? 'selected' : ''}`}
    data-cy={dataCy}
    onClick={() => setFilter(filter)}
  >
    {label}
  </a>
);
