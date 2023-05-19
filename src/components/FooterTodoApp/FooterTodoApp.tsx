import classNames from 'classnames';
import React, { FC } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  category: Filter;
  onChange: (category: Filter) => void;
}

export const FooterTodoApp: FC<Props> = React.memo(({
  todos,
  category,
  onChange,
}) => {
  const leftItems = todos.filter(({ completed }) => completed === false).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${leftItems} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: category === Filter.All,
          })}
          onClick={() => onChange(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: category === Filter.Active,
          })}
          onClick={() => onChange(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: category === Filter.Completed,
          })}
          onClick={() => onChange(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          notification: todos.length - leftItems <= 0,
          hidden: todos.length - leftItems <= 0,
        })}
      >
        Clear completed
      </button>
    </footer>
  );
});
