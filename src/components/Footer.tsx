import React from 'react';
import classNames from 'classnames';
import { FilterBy } from '../types/FilterBy';

type Props = {
  activeTodosNum: number;
  completedTodosNum: number;
  todoFilterType: string;
  setTodoFilterType: (todoFilterType: FilterBy) => void;
};

const Footer: React.FC<Props> = ({
  activeTodosNum,
  completedTodosNum,
  todoFilterType,
  setTodoFilterType,
}) => {
  return (
    <>
      {/* Hide the footer if there are no todos */}
      <footer className="todoapp__footer">
        <span className="todo-count">{`${activeTodosNum} items left`}</span>

        {/* Active filter should have a 'selected' class */}
        <nav className="filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: todoFilterType === FilterBy.all,
            })}
            onClick={() => setTodoFilterType(FilterBy.all)}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: todoFilterType === FilterBy.active,
            })}
            onClick={() => setTodoFilterType(FilterBy.active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: todoFilterType === FilterBy.completed,
            })}
            onClick={() => setTodoFilterType(FilterBy.completed)}
          >
            Completed
          </a>
        </nav>
        <button
          type="button"
          className={classNames('todoapp__clear-completed', {
            hidden: completedTodosNum === 0,
          })}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};

export default Footer;
