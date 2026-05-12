import React from 'react';
import { Filter as FilterEnum } from '../types/Enums';

type Props = {
  activeCount: number;
  completedCount: number;
  filter: FilterEnum;
  setFilter: (f: FilterEnum) => void;
  onClearCompleted: () => void;
};

const FILTERS: {
  key: FilterEnum;
  label: string;
  hash: string;
  dataCy: string;
}[] = [
  {
    key: FilterEnum.All,
    label: 'All',
    hash: '#/',
    dataCy: 'FilterLinkAll',
  },
  {
    key: FilterEnum.Active,
    label: 'Active',
    hash: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    key: FilterEnum.Completed,
    label: 'Completed',
    hash: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  filter,
  setFilter,
  onClearCompleted,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} {activeCount === 1 ? 'item' : 'items'} left
    </span>

    <nav className="filter" data-cy="Filter">
      {FILTERS.map(f => (
        <a
          key={f.key}
          href={f.hash}
          className={`filter__link ${filter === f.key ? 'selected' : ''}`}
          data-cy={f.dataCy}
          onClick={() => setFilter(f.key)}
        >
          {f.label}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={completedCount === 0}
      onClick={onClearCompleted}
    >
      Clear completed
    </button>
  </footer>
);

export default Footer;
