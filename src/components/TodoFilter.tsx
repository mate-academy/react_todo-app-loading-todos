import classNames from 'classnames';
import { FilterTodos } from '../types/FilterTodos';

type Props = {
  setFilterTodos: (text: string) => void,
  filterTodos: string,
};

export const TodoFilter: React.FC<Props> = ({
  setFilterTodos,
  filterTodos,
}) => {
  const handleFilter = (filter: FilterTodos) => () => {
    setFilterTodos(filter);
  };

  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterTodos === FilterTodos.All,
        })}
        onClick={handleFilter(FilterTodos.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterTodos === FilterTodos.Active,
        })}
        onClick={handleFilter(FilterTodos.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterTodos === FilterTodos.Completed,
        })}
        onClick={handleFilter(FilterTodos.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
