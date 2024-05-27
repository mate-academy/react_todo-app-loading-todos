import React from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filter: Filter;
  todos: Todo[];
};

export const TodoFooter: React.FC<Props> = ({ setFilter, filter, todos }) => {
  const todosLeft = todos.filter(todo => !todo.completed).length;

  const handeClearCompleted = () => {};

  return (
    <>
      {todos.length > 0 ? (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todosLeft} item${todos.length === 1 ? '' : 's'} left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              onClick={() => setFilter(Filter.All)}
              className={classNames('filter__link', {
                selected: filter === Filter.All,
              })}
              data-cy="FilterLinkAll"
            >
              All
            </a>

            <a
              href="#/active"
              onClick={() => setFilter(Filter.Active)}
              className={classNames('filter__link', {
                selected: filter === Filter.Active,
              })}
              data-cy="FilterLinkActive"
            >
              Active
            </a>

            <a
              href="#/completed"
              onClick={() => setFilter(Filter.Completed)}
              className={classNames('filter__link', {
                selected: filter === Filter.Completed,
              })}
              data-cy="FilterLinkCompleted"
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handeClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      ) : (
        <div> </div>
      )}
    </>
  );
};
