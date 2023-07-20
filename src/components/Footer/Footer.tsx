import classNames from 'classnames';
import React from 'react';
import { removeTodo } from '../../api/todos';
import { Error, Filter, Todo } from '../../types/Todo';

type Props = {
  setFilter: (filter: Filter) => void;
  filter: Filter;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setHasError: (value: Error) => void;
};

export const Footer: React.FC<Props> = ({
  setFilter,
  filter,
  todos,
  setTodos,
  setHasError,
}) => {
  const countItems = todos.filter(todo => !todo.completed).length;

  const filterAllHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setFilter(Filter.All);
  };

  const filterActiveHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setFilter(Filter.Active);
  };

  const filterCompleteHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setFilter(Filter.Completed);
  };

  const clearCompletedHandler = () => {
    const ids = todos
      .filter(t => t.completed)
      .map(t => t.id);

    ids.forEach(id => {
      removeTodo(id)
        .catch(() => {
          setHasError(Error.Delete);
        });
    });

    setTodos(todos.filter(t => !t.completed));
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {countItems}
        {' '}
        items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.All,
          })}
          onClick={filterAllHandler}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.Active,
          })}
          onClick={filterActiveHandler}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.Completed,
          })}
          onClick={filterCompleteHandler}
        >
          Completed
        </a>
      </nav>

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={clearCompletedHandler}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
