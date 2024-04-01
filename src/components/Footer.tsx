import React from 'react';
import classNames from 'classnames';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { deleteTodos } from '../api/todos';
import { useTodosContext } from './useTodosContext';

type Props = {
  query: Status;
  setQuery: (query: Status) => void;
};

export const Footer: React.FC<Props> = ({ query, setQuery }) => {
  const {
    todos,
    setTodos,
    setLoadingTodosIds,
    handleError,
    setIsInputFocused,
  } = useTodosContext();
  const completedIds = todos
    .filter(item => item.completed === true)
    .map(item => item.id);
  const notCompletedQuantity = todos.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  const handleClearCompleted = () => {
    setLoadingTodosIds(currentIds => [...currentIds, ...completedIds]);

    deleteTodos(completedIds)
      .then(() => {
        setTodos(currentTodos => {
          return currentTodos.filter(todo => !todo.completed);
        });
      })
      .catch(() => handleError('Unable to delete completed todos'))
      .finally(() => {
        setLoadingTodosIds(currentIds =>
          currentIds.filter(id => !completedIds.includes(id)),
        );
        setIsInputFocused(true);
      });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedQuantity} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(status => (
          <a
            key={status}
            href={`#/${status.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: query === status,
            })}
            data-cy={`FilterLink${status}`}
            onClick={() => setQuery(status)}
          >
            {status}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedIds}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
