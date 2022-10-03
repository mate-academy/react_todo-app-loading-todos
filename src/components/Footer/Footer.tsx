import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo } from '../../api/todos';

type Props = {
  todos: Todo[];
  setTodos: (todos: (Todo[] | ((prevTodos: Todo[]) => Todo[]))) => void;
  setFilterType: (filter: string) => void;
  filterType: string;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  setFilterType,
  filterType,
}) => {
  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }

      return !todo.completed;
    });

    setTodos(newTodos);
  };

  const handleFilterType = (typeOfFilter: string) => {
    setFilterType(typeOfFilter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} ${todos.length === 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterType === 'all' },
          )}
          onClick={() => handleFilterType('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterType === 'active' },
          )}
          onClick={() => handleFilterType('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterType === 'completed' },
          )}
          onClick={() => handleFilterType('completed')}
        >
          Completed
        </a>
      </nav>

      {todos.some(todo => todo.completed) && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
