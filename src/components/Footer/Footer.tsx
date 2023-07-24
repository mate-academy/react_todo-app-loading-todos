import classNames from 'classnames';
import { FilterOption } from '../../types/FilterOption';
import { Todo } from '../../types/Todo';

type Props = {
  activeTodos: Todo[];
  filterOption: FilterOption;
  setFilterOption: (option: FilterOption) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodos,
  filterOption,
  setFilterOption,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${activeTodos.length} items left`}
    </span>

    {/* Active filter should have a 'selected' class */}
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link',
          { selected: filterOption === FilterOption.ALL })}
        onClick={() => setFilterOption(FilterOption.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link',
          { selected: filterOption === FilterOption.ACTIVE })}
        onClick={() => setFilterOption(FilterOption.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link',
          { selected: filterOption === FilterOption.COMPLETED })}
        onClick={() => setFilterOption(FilterOption.COMPLETED)}
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
