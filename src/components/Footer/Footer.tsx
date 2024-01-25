import { FilterItem } from '../../types/FilterItem';
import { Filter } from '../Filter/Filter';

type Props = {
  activeTodos?: number;
  completedTodos?: number;
  setFilter: (value: FilterItem) => void;
  filter: string;
};

export const Footer: React.FC<Props> = ({
  completedTodos,
  activeTodos,
  setFilter,
  filter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <Filter
        setFilter={setFilter}
        filter={filter}
      />

      {/* <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className="filter__link selected"
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav> */}

      {completedTodos !== 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
