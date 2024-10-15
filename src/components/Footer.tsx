import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { FilterOptions } from '../enums/FilterOptions';

interface FooterProps {
  todos: Todo[];
  completedTodos: Todo[];
  filter: FilterOptions;
  setFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onCompletedTodosDeleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  completedTodos,
  filter,
  setFilter,
  onCompletedTodosDeleted,
}) => {
  const atLeastOneIsActive = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length - completedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FilterOptions.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterOptions.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FilterOptions.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterOptions.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FilterOptions.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterOptions.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {atLeastOneIsActive && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={onCompletedTodosDeleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
