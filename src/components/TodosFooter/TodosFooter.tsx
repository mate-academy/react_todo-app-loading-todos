import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filterProp: Filter;
  changeFilterProp: (prop: Filter) => void;
  activeTodosNum: number;
};

export const TodosFooter: React.FC<Props> = ({
  filterProp,
  changeFilterProp,
  activeTodosNum,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosNum} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={
            `filter__link ${filterProp === Filter.All && 'selected'}`
          }
          onClick={() => changeFilterProp(Filter.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={
            `filter__link ${filterProp === Filter.Active && 'selected'}`
          }
          onClick={() => changeFilterProp(Filter.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={
            `filter__link ${filterProp === Filter.Completed && 'selected'}`
          }
          onClick={() => changeFilterProp(Filter.Completed)}
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
