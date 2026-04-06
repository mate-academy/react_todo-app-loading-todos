import React, { useCallback } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

export type FilterOptions = 'all' | 'active' | 'completed';

type Props = {
  filterTodos: FilterOptions;
  todos: Todo[];
  onFilterTodos: (filter: FilterOptions) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoMainFooter = React.memo<Props>(
  ({ filterTodos, todos, onFilterTodos, setTodos }) => {
    const totalCompleted = todos.filter(todo => todo.completed).length;

    const handleLinkAll = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        onFilterTodos('all');
      },
      [onFilterTodos],
    );

    const handleLinkActive = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        onFilterTodos('active');
      },
      [onFilterTodos],
    );

    const handleLinkCompleted = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        onFilterTodos('completed');
      },
      [onFilterTodos],
    );

    const handleLinkClearCompleted = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.completed === false),
        );
      },
      [setTodos],
    );

    return (
      <footer className="todoapp__footer" data-cy="Footer">
        {/* Hide the footer if there are no todos */}
        <span className="todo-count" data-cy="TodosCounter">
          {todos.length - totalCompleted} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filterTodos === 'all',
            })}
            data-cy="FilterLinkAll"
            onClick={handleLinkAll}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filterTodos === 'active',
            })}
            data-cy="FilterLinkActive"
            onClick={handleLinkActive}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filterTodos === 'completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={handleLinkCompleted}
          >
            Completed
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleLinkClearCompleted}
          disabled={!totalCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

TodoMainFooter.displayName = 'TodoMainFooter';
