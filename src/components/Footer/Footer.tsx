import React from 'react';
import classNames from 'classnames';
import { TypeFilterin } from '../../types/FilterTypes';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTypeOfFiltering: (x:TypeFilterin) => void;
  typeOfFiltering: TypeFilterin;
};

export const Footer:React.FC<Props> = ({
  todos,
  setTypeOfFiltering,
  typeOfFiltering,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.filter(todo => todo.completed === false).length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={
            classNames(
              'filter__link',
              { selected: typeOfFiltering === TypeFilterin.All },
            )
          }
          onClick={() => setTypeOfFiltering(TypeFilterin.All)}
        >
          {TypeFilterin.All}
        </a>

        <a
          href="#/active"
          className={
            classNames(
              'filter__link',
              { selected: typeOfFiltering === TypeFilterin.Active },
            )
          }
          onClick={() => setTypeOfFiltering(TypeFilterin.Active)}
        >
          {TypeFilterin.Active}
        </a>

        <a
          href="#/completed"
          className={
            classNames(
              'filter__link',
              { selected: typeOfFiltering === TypeFilterin.Completed },
            )
          }
          onClick={() => setTypeOfFiltering(TypeFilterin.Completed)}
        >
          {TypeFilterin.Completed}
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
