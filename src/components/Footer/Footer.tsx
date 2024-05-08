import cn from 'classnames';

import { FilterField } from '../../types/FilterField';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  filterField: FilterField;
  setFilterField: (field: FilterField) => void;
}

export const Footer: React.FC<Props> = ({
  todos,
  filterField,
  setFilterField,
}) => {
  const activeTodos = todos.reduce(
    (acc, todo) => (todo.completed ? acc : acc + 1),
    0,
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterField === FilterField.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterField(FilterField.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterField === FilterField.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterField(FilterField.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterField === FilterField.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterField(FilterField.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
