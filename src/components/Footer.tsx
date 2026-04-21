import React from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  handleActiveTodosButton: () => void;
  handleCompletedTodosButton: () => void;
  handleAllTodosButton: () => void;
  selected: string;
};

export const Footer: React.FC<Props> = ({
  todos,
  handleActiveTodosButton,
  handleCompletedTodosButton,
  handleAllTodosButton,
  selected,
}) => {
  const completedTodosLength = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {completedTodosLength} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          onClick={handleAllTodosButton}
          href="#/"
          className={cn('filter__link', {
            selected: selected === 'all',
          })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          onClick={handleActiveTodosButton}
          id="active_link"
          href="#/active"
          className={cn('filter__link', {
            selected: selected === 'active',
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          onClick={handleCompletedTodosButton}
          id="completed_link"
          href="#/completed"
          className={cn('filter__link', {
            selected: selected === 'completed',
          })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
