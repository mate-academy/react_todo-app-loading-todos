import React from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filterValue: Filter;
  onClickFilter: (filterValue: Filter) => void;
};

const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  filterValue,
  onClickFilter,
}) => {
  const isCompleted = todos.some(todo => todo.completed);

  const allNotCompleted = todos.filter(todo => !todo.completed).length;

  const allActive = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${allNotCompleted} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filterValue === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => onClickFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filterValue === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => onClickFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterValue === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onClickFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isCompleted}
        onClick={() => setTodos(allActive)}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
