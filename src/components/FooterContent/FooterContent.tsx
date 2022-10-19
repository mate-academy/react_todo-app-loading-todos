import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo } from '../../api/todos';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[];
  setTodos: (todos: (Todo[] | ((prevTodos: Todo[]) => Todo[]))) => void;
  setFilterType: (filter: string) => void;
  filterType: string;
};

export const FooterContent: React.FC<Props> = ({
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

  const calculateActiveTodos = () => {
    const activeTodos = todos.filter((todo) => !todo.completed);

    return activeTodos.length;
  };

  const handleFilterType = (typeOfFilter: string) => {
    setFilterType(typeOfFilter);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${calculateActiveTodos()} ${calculateActiveTodos() === 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.all },
          )}
          onClick={() => handleFilterType(FilterType.all)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.active },
          )}
          onClick={() => handleFilterType(FilterType.active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.completed },
          )}
          onClick={() => handleFilterType(FilterType.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={handleClearCompleted}
      >
        {todos.some(todo => todo.completed) && 'Clear completed'}
      </button>
    </footer>
  );
};
