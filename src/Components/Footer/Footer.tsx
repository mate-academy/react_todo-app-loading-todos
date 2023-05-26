import { FC } from 'react';
import cn from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter;
  onSelect: (filter: Filter) => void;
};

export const Footer: FC<Props> = ({ filter, onSelect }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">3 items left</span>

      <nav className="filter">
        <a
          href="#/"
          onClick={() => onSelect(Filter.All)}
          className={cn('filter__link', {
            selected: filter === Filter.All,
          })}
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => onSelect(Filter.Active)}
          className={cn('filter__link', {
            selected: filter === Filter.Active,
          })}
        >
          Active
        </a>

        <a
          href="#/completed"
          onClick={() => onSelect(Filter.Completed)}
          className={cn('filter__link', {
            selected: filter === Filter.Completed,
          })}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
