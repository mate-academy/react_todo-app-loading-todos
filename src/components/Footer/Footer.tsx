import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  selectedValue: (value: string) => void;
  onSelect: string;
};

export const Footer: React.FC<Props> = ({ todos, selectedValue, onSelect }) => {
  function notCompletedTodo() {
    return todos.filter(todo => todo.completed === false).length;
  }

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {notCompletedTodo()} items left
        </span>

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
