/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Status, TodosContext } from '../TodoContext/TodoContext';

export const Footer: React.FC = () => {
  const {
    todos,
    deleteCompletedTodos,
    setQuery,
    query,
  } = useContext(TodosContext);

  const unCompletedTodos = todos.filter(todo => todo.completed === false);

  const completedTodos = todos.filter(todo => todo.completed === true);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${unCompletedTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={classNames('filter__link', {
            selected: query === Status.All,
          })}
          onClick={() => {
            setQuery(Status.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={classNames('filter__link', {
            selected: query === Status.Active,
          })}
          onClick={() => {
            setQuery(Status.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={classNames('filter__link', {
            selected: query === Status.Completed,
          })}
          onClick={() => {
            setQuery(Status.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => deleteCompletedTodos()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
