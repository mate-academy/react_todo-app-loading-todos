import { FilterKeys } from '../types/filters';
import { Todo } from '../types/Todo';

export const AppFooter = ({
  todos,
  filter,
  setFilter,
}: {
  todos: Todo[];
  filter: keyof typeof FilterKeys;
  setFilter: (val: keyof typeof FilterKeys) => void;
}) => {
  const completedTodos = todos?.filter(todo => !todo.completed).length;
  const filterKeys = Object.keys(FilterKeys) as Array<keyof typeof FilterKeys>;

  return (
    <footer
      className={`todoapp__footer ${!todos?.length ? 'hidden' : ''}`}
      data-cy="Footer"
    >
      <span className="todo-count" data-cy="TodosCounter">
        {`${completedTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterKeys.map(value => (
          <a
            key={value}
            href="#/"
            className={`filter__link ${filter === value ? 'selected' : ''}`}
            data-cy={`FilterLink${FilterKeys[value]}`}
            onClick={() => setFilter(value)}
          >
            {FilterKeys[value]}
          </a>
        ))}
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
