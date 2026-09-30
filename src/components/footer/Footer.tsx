import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterOption } from '../../types/FilterOption';

type Props = {
  todos: Todo[];
  filterStatus: FilterOption;
  setFilterStatus: (status: FilterOption) => void;
};

export const Footer = ({ todos, filterStatus, setFilterStatus }: Props) => {
  if (todos.length === 0) {
    return null;
  }

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const filterOptions = [
    FilterOption.All,
    FilterOption.Active,
    FilterOption.Completed,
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} `}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptions.map(options => {
          return (
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filterStatus === options,
              })}
              data-cy="FilterLinkAll"
              onClick={() => {
                setFilterStatus(options);
              }}
              key={options}
            >
              {options}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
