import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  allTodos: Todo[];
  selectedValue: (value: string) => void;
  onSelect: string;
};

export const Footer: React.FC<Props> = ({
  allTodos,
  selectedValue,
  onSelect,
}) => {
  function notCompletedTodo() {
    return allTodos.filter(todo => todo.completed === false).length;
  }

  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {notCompletedTodo()} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={cn('filter__link', { selected: onSelect === 'All' })}
            data-cy="FilterLinkAll"
            onClick={() => selectedValue('All')}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', { selected: onSelect === 'Active' })}
            data-cy="FilterLinkActive"
            onClick={() => selectedValue('Active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', {
              selected: onSelect === 'Completed',
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => selectedValue('Completed')}
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
    </>
  );
};
