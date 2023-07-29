import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { FilterBy } from '../../utils/FilterBy';

type Props = {
  todos: Todo[];
  filterBy: FilterBy;
  whenTodoShow: (filterBy: FilterBy) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  filterBy,
  whenTodoShow,
}) => {
  const todosNotDone = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosNotDone} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === FilterBy.All,
          })}
          onClick={() => whenTodoShow(FilterBy.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterBy === FilterBy.Active,
          })}
          onClick={() => whenTodoShow(FilterBy.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterBy === FilterBy.Completed,
          })}
          onClick={() => whenTodoShow(FilterBy.Completed)}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
