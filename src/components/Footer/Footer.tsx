import React from 'react';
import classNames from 'classnames';
import { FooterProps } from './FooterProps';
import { Error } from '../../Error';

export const Footer: React.FC<FooterProps> = ({
  todoList,
  setFilter,
  filter,
  deleteTodo,
  setError,
  anyCompletedTodo,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todoList.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link',
            { selected: filter === 'All' })}
          onClick={() => {
            setFilter('All');
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link',
            { selected: filter === 'Active' })}
          onClick={() => {
            setFilter('Active');
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link',
            { selected: filter === 'Completed' })}
          onClick={() => {
            setFilter('Completed');
          }}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={() => {
          todoList.map((todo) => {
            if (todo.completed) {
              deleteTodo(todo.id);
            } else {
              setError(Error.DELETING);
            }

            return todo;
          });
        }}
        style={(!anyCompletedTodo) ? { visibility: 'hidden' } : {}}
      >
        Clear completed
      </button>
    </footer>
  );
};
