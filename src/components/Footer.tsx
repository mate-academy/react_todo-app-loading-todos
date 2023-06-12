import React from 'react';
import classNames from 'classnames';
import { ClearCompleted } from './ClearCompleted';
import { Filter } from '../enums/enums';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filterValue: Filter;
  onActive: () => void;
  onAll: () => void;
  onCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterValue,
  onActive,
  onAll,
  onCompleted,
}) => {
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterValue === Filter.All,
          })}
          onClick={onAll}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterValue === Filter.Active,
          })}
          onClick={onActive}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterValue === Filter.Completed,
          })}
          onClick={onCompleted}
        >
          Completed
        </a>
      </nav>

      <ClearCompleted todos={todos} />
    </footer>
  );
};
