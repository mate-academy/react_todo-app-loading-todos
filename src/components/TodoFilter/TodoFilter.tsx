import classNames from 'classnames';
import { FilteredTodos } from '../../enums/FilteredTodo';

interface TodoFilterProps {
  filterSelected: FilteredTodos;
  setFilterSelected: (filterSelected: FilteredTodos) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterSelected,
  setFilterSelected,
}) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterSelected === FilteredTodos.all,
        })}
        data-cy="FilterLinkAll"
        onClick={() => setFilterSelected(FilteredTodos.all)}
      >
        {FilteredTodos.all}
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterSelected === FilteredTodos.active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => setFilterSelected(FilteredTodos.active)}
      >
        {FilteredTodos.active}
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterSelected === FilteredTodos.completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilterSelected(FilteredTodos.completed)}
      >
        {FilteredTodos.completed}
      </a>
    </nav>
  );
};
