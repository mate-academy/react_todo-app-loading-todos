/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-filename-extension */
import { TodoList } from './TodoList';

export const TodoContent = ({ newTodoField }) => {
  return (
    <div className="todoapp__content">
      <header className="todoapp__header">
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
        />

        <form>
          <input
            data-cy="NewTodoField"
            type="text"
            ref={newTodoField}
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <TodoList />

      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="todosCounter">
          4 items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            data-cy="FilterLinkAll"
            href="#/"
            className="filter__link selected"
          >
            All
          </a>

          <a
            data-cy="FilterLinkActive"
            href="#/active"
            className="filter__link"
          >
            Active
          </a>
          <a
            data-cy="FilterLinkCompleted"
            href="#/completed"
            className="filter__link"
          >
            Completed
          </a>
        </nav>

        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};
