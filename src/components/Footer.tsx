import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  currentSelect: string;
  onSaveTodos: (todos: Todo[]) => void;
  onSaveCurrentSelect: (filter: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  currentSelect,
  onSaveTodos,
  onSaveCurrentSelect,
}) => {
  const filterByStatus = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const filter = event.currentTarget.textContent;

    onSaveTodos(
      todos.filter((todo: Todo) => {
        if (filter === 'Active') {
          return !todo.completed;
        } else if (filter === 'Completed') {
          return todo.completed;
        }

        return true;
      }),
    );

    if (filter !== null) {
      onSaveCurrentSelect(filter);
    }
  };

  const completedTodos = () => {
    return todos.some(todo => todo.completed);
  };

  const todosCounter = () => todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCounter()} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: currentSelect === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={filterByStatus}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: currentSelect === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={filterByStatus}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: currentSelect === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={filterByStatus}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos()}
      >
        Clear completed
      </button>
    </footer>
  );
};
