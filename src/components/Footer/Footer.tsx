import React from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  setFilter: (q: Filter) => void;
  filterOption: Filter;
  todos: Todo[];
}

export const Footer: React.FC<Props> = ({ setFilter, filterOption, todos }) => {
  const completedTodo = todos.filter(todo => todo.completed).length;
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {
          todosLeft === 1
            ? `${todosLeft} item left`
            : `${todosLeft} items left`
        }
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: filterOption === Filter.All },
          )}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            cn(
              'filter__link',
              { selected: filterOption === Filter.Active },
            )
          }
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            cn(
              'filter__link',
              { selected: filterOption === Filter.Active },
            )
          }
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      {completedTodo && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};