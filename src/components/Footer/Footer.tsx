import React from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  filter: Filter;
  setFilter: (value: Filter) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, setFilter }) => {
  const numberOfActiveTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${numberOfActiveTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.keys(Filter).map((key) => {
          const value = Filter[key as keyof typeof Filter];

          return (
            <a
              key={key}
              data-cy={`FilterLink${key}`}
              href={`#/${value}`}
              className={classNames('filter__link', {
                selected: value === filter,
              })}
              onClick={() => setFilter(value)}
            >
              {key}
            </a>
          );
        })}
        {/* <a href="#/" className="filter__link selected">
          All
        </a>

        <a href="#/active" className="filter__link">
          Active
        </a>

        <a href="#/completed" className="filter__link">
          Completed
        </a> */}
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
