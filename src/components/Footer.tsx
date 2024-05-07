import cn from 'classnames';
import { useContext, useMemo } from 'react';
import { TodosContext } from './Context';
import { Filter } from '../types/Filter';

type Props = {
  filter: string;
  handleFilterClick: (e: React.MouseEvent) => void;
};

export const Footer: React.FC<Props> = ({
  filter: filter,
  handleFilterClick,
}) => {
  const { todos } = useContext(TodosContext);

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
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === Filter.All,
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
            selected: filter === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={handleFilterClick}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterClick}
        >
          Completed
        </a>
      </nav>
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
