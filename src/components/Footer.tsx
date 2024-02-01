import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../contexts/TodoContext';
import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/Status';

export const Footer: React.FC = () => {
  const { todos, setStatus, status } = useContext(TodoContext);
  const visibleTodo = todos.some(todo => todo.completed);

  const unCompletedTodos = (todosList: Todo[]) => {
    return todosList.filter(todo => !todo.completed).length;
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${unCompletedTodos(todos)} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={classNames(
            'filter__link',
            { selected: status === FilterStatus.All },
          )}
          onClick={() => setStatus(FilterStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={classNames(
            'filter__link',
            { selected: status === FilterStatus.Active },
          )}
          onClick={() => setStatus(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={classNames(
            'filter__link',
            { selected: status === FilterStatus.Completed },
          )}
          onClick={() => setStatus(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      {!!visibleTodo && (
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
