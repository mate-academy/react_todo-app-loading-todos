import React from 'react';
import { SelectedStatus, Todo } from '../../types/Todo';
import cn from 'classnames';

type FooterProps = {
  todos: Todo[];
  selectedStatus: string;
  setStatus: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Footer: React.FC<FooterProps> = ({
  todos,
  selectedStatus,
  setStatus,
}) => {
  return (
    <>
      {/* Hide the footer if there are no todos */}
      {todos.length !== 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {/* eslint-disable max-len */}
            {todos.reduce(
              (count, todo) => count + (todo.completed ? 0 : 1),
              0,
            )}{' '}
            {/* eslint-enable max-len */}
            items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: selectedStatus === SelectedStatus.all,
              })}
              data-cy="FilterLinkAll"
              onClick={setStatus}
            >
              {SelectedStatus.all}
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: selectedStatus === SelectedStatus.active,
              })}
              data-cy="FilterLinkActive"
              onClick={setStatus}
            >
              {SelectedStatus.active}
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: selectedStatus === SelectedStatus.completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={setStatus}
            >
              {SelectedStatus.completed}
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
