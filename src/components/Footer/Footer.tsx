import React, { useCallback } from 'react';
import classNames from 'classnames';
import { TypeOfFiltering } from '../../types/TypeOfFiltering';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setFilterType: (x:TypeOfFiltering) => void;
  filterType: TypeOfFiltering;
};

export const Footer:React.FC<Props> = ({
  todos,
  setFilterType: setTypeOfFiltering,
  filterType: typeOfFiltering,
}) => {
  const notCompletedTodosCount = todos.filter(todo => !todo.completed).length;

  const isDisabled = useCallback(() => {
    return todos.find(todo => todo.completed) === undefined;
  }, [todos]);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${notCompletedTodosCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={
            classNames(
              'filter__link',
              { selected: typeOfFiltering === TypeOfFiltering.All },
            )
          }
          onClick={() => setTypeOfFiltering(TypeOfFiltering.All)}
        >
          {TypeOfFiltering.All}
        </a>

        <a
          href="#/active"
          className={
            classNames(
              'filter__link',
              { selected: typeOfFiltering === TypeOfFiltering.Active },
            )
          }
          onClick={() => setTypeOfFiltering(TypeOfFiltering.Active)}
        >
          {TypeOfFiltering.Active}
        </a>

        <a
          href="#/completed"
          className={
            classNames(
              'filter__link',
              { selected: typeOfFiltering === TypeOfFiltering.Completed },
            )
          }
          onClick={() => setTypeOfFiltering(TypeOfFiltering.Completed)}
        >
          {TypeOfFiltering.Completed}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={isDisabled()}
      >
        Clear completed
      </button>
    </footer>
  );
};
