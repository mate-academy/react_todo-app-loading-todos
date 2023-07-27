import cn from 'classnames';
import { Todo } from '../types/Todo';
import { FilterTypes } from '../types/Filter';
import { ErrorType } from '../types/Error';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: FilterTypes,
  setFilter: (filter: FilterTypes) => void;
  setError: (value: ErrorType) => void;
};

export const Filter: React.FC<Props> = ({
  todos,
  setTodos,
  filter,
  setFilter,
  setError, // will set in nextTask afrer deleting on server
}) => {
  const amountActiveTodos = todos.filter((todo) => !todo.completed).length;
  const availableCompletedTodos = todos.some((todo) => todo.completed);

  function clearCompletedTodos() {
    const updatedTodos = todos.filter((todo) => !todo.completed);

    setTodos(updatedTodos);
  }

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{`${amountActiveTodos} items left`}</span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === FilterTypes.All,
          })}
          onClick={() => {
            setFilter(FilterTypes.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === FilterTypes.Active,
          })}
          onClick={() => {
            setFilter(FilterTypes.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === FilterTypes.Completed,
          })}
          onClick={() => {
            setFilter(FilterTypes.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={cn('todoapp__clear-completed',
          { 'is-invisible': !availableCompletedTodos })}
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
