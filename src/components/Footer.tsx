import cn from 'classnames';
import { useContext, useMemo } from 'react';
import { TodosContext } from './TodosContext';
import { FilterBy } from '../types';

type Props = {
  filterBy: string;
  handleFilterClick: (e: React.MouseEvent) => void;
};

export const Footer: React.FC<Props> = ({ filterBy, handleFilterClick }) => {
  const todos = useContext(TodosContext);

  const itemsLeftAmount = useMemo(() => {
    return todos.reduce((res, todo) => {
      return todo.completed ? res : res + 1;
    }, 0);
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${itemsLeftAmount} item${itemsLeftAmount === 1 ? '' : 's'} left`}
      </span>
      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.All,
          })}
          data-cy="FilterLinkAll"
          type="button"
          onClick={handleFilterClick}
        >
          All
        </a>
        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={handleFilterClick}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === FilterBy.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterClick}
        >
          Completed
        </a>
      </nav>
      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={itemsLeftAmount === todos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
