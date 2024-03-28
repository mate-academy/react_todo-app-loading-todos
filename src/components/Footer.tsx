import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status } from '../types/Status';
import { TodosContext } from './TodoContext';
import { Todo } from '../types/Todo';
import { deleteCompletedTodos } from '../api/todos';

type Props = {
  query: Status;
  setQuery: (query: Status) => void;
};

export const Footer: React.FC<Props> = ({ query, setQuery }) => {
  const { list, setList } = useContext(TodosContext);
  const containsCompleted = list.some(item => item.completed === true);
  const notCompletedQuantity = list.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  const handleClearCompleted = () => {
    const todosToDelete = list.filter(todo => todo.completed);

    deleteCompletedTodos(todosToDelete);
    setList(currentTodos => {
      return currentTodos.filter(todo => !todo.completed);
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedQuantity} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: query === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setQuery(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: query === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setQuery(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: query === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setQuery(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!containsCompleted}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
