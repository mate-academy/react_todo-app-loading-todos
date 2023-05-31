import React from 'react';
import classNames from 'classnames';

import { SelectTodo } from '../../types/SelectTodo';

type Props = {
  selectTodo: (selectTodo: string) => void;
  selected: string;
};

export const Footer: React.FC<Props> = React.memo(({
  selectTodo,
  selected,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link',
            { selected: selected === SelectTodo.All })}
          onClick={() => selectTodo(SelectTodo.All)}
        >
          {SelectTodo.All}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: selected === SelectTodo.Active })}
          onClick={() => selectTodo(SelectTodo.Active)}
        >
          {SelectTodo.Active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: selected === SelectTodo.Completed })}
          onClick={() => selectTodo(SelectTodo.Completed)}
        >
          {SelectTodo.Completed}
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
});
