import React from 'react';
import { SortType } from '../../types/SortType';

interface Props {
  setSelectParametr: (param: string) => void,
}

export const TodoAppFooter: React.FC<Props> = ({ setSelectParametr }) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { title } = event.currentTarget;

    setSelectParametr(title);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          title={SortType.all}
          data-cy="FilterLinkAll"
          href="#/"
          className="filter__link selected"
          onClick={handleClick}
        >
          All
        </a>

        <a
          title={SortType.active}
          data-cy="FilterLinkActive"
          href="#/active"
          className="filter__link"
          onClick={handleClick}
        >
          Active
        </a>

        <a
          title={SortType.completed}
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className="filter__link"
          onClick={handleClick}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
