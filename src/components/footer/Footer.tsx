import cn from 'classnames';
import { Filter } from '../../types/Filter';

interface Props {
  onSelect: (filter: string) => void;
  selectedFilter: string;
  itemsLeft: number;
  completedTodos: number;
}

export const Footer: React.FC<Props> = ({
  onSelect,
  selectedFilter,
  itemsLeft,
  completedTodos,
}) => (
  <footer className="todoapp__footer">

    <span className="todo-count">
      {`${itemsLeft} items left`}
    </span>

    <nav className="filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: selectedFilter === 'all',
        })}
        onClick={(event) => {
          event.preventDefault();
          onSelect(Filter.ALL);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: selectedFilter === 'active',
        })}
        onClick={() => {
          onSelect(Filter.ACTIVE);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: selectedFilter === 'completed',
        })}
        onClick={() => {
          onSelect(Filter.COMPLETED);
        }}
      >
        Completed
      </a>
    </nav>

    {completedTodos !== 0 && (
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    )}
  </footer>
);
