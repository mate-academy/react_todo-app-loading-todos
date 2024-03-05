import { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from './Todos.Context';
import { Status } from '../types/Todo';

export const TodoFilter: React.FC = () => {
  const { todos, setStatus, filteredTodos, setTodos, status } =
    useContext(TodosContext);

  const filterTodos = (s: Status) => {
    setStatus(s);
  };

  const clearCompleted = () => {
    const clear = todos.filter(todo => !todo.completed);

    setTodos(clear);
  };

  const itemsLeft = `${todos.filter(item => !item.completed).length} items left`;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: status === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => filterTodos(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: status === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => filterTodos(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: status === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => filterTodos(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={filteredTodos.filter(item => item.completed).length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
