import React from 'react';
import cn from 'classnames';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  completedTodos: Todo[];
  uncompletedTodos: Todo[];
  todos: Todo[];
  filterStatus: Status;
  setFilterStatus: (value: Status) => void;
};

export const Footer: React.FC<Props> = ({
  completedTodos,
  uncompletedTodos,
  todos,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <>
      {todos?.length > 0 && (
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${uncompletedTodos?.length} items left`}
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: filterStatus === Status.ALL,
              })}
              onClick={() => setFilterStatus(Status.ALL)}
            >
              All
            </a>

            <a
              href="#/"
              className={cn('filter__link', {
                selected: filterStatus === Status.ACTIVE,
              })}
              onClick={() => setFilterStatus(Status.ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/"
              className={cn('filter__link', {
                selected: filterStatus === Status.COMPLETEED,
              })}
              onClick={() => setFilterStatus(Status.COMPLETEED)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            style={{ opacity: completedTodos.length > 0 ? '1' : '0' }}
            disabled={!completedTodos?.length}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
