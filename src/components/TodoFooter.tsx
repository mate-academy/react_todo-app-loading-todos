import React, { useContext } from 'react';
import { TodoContext } from '../context/todoContext';
import { SelectType } from '../enums';
import classNames from 'classnames';

export const TodoFooter: React.FC = () => {
  const { select, onSelect } = useContext(TodoContext);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">3 items left</span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames("filter__link", {
            selected: select === SelectType.All,
          })}
          onClick={() => onSelect(SelectType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames("filter__link", {
            selected: select === SelectType.Active,
          })}
          onClick={() => onSelect(SelectType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames("filter__link", {
            selected: select === SelectType.Completed,
          })}
          onClick={() => onSelect(SelectType.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
