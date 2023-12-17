/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/Todo';
import { Status } from './types/Status';

const USER_ID = 12035;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterByStatus, setFilterByStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [error, setError] = useState<null | string>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setShowError(false);
      setError(null);
      getTodos(USER_ID)
        .then(setTodos)
        .catch(() => {
          setShowError(true);
          setError('Unable to load todos');
        });
    };

    loadData();
  }, []);

  useEffect(() => {
    const filterTodos = (filter: string) => {
      switch (filter) {
        case Status.Active:
          return todos.filter(todo => !todo.completed);

        case Status.Completed:
          return todos.filter(todo => todo.completed);

        default:
          return todos;
      }
    };

    setFilteredTodos(
      filterTodos(filterByStatus),
    );
  }, [filterByStatus, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const hideErrorMessage = () => {
    setShowError(false);
  };

  const changeFilter = (newFilter: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setFilterByStatus(newFilter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          <div data-cy="Todo" className="todo completed">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Completed Todo
            </span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* overlay will cover the todo while it is being updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}

          {/* This todo is being edited */}
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is in loadind state */}
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {todos.length !== 0 ? (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link  ${filterByStatus === 'all' ? 'selected' : ''}
                }`}
                data-cy="FilterLinkAll"
                onClick={changeFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link  ${filterByStatus === 'active' ? 'selected' : ''}
                }`}
                data-cy="FilterLinkActive"
                onClick={changeFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link  ${filterByStatus === 'completed' ? 'selected' : ''}
                }`}
                data-cy="FilterLinkCompleted"
                onClick={changeFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={removeCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )
          : ''}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {showError && (
        <div
          data-cy="ErrorNotification"
          id="errorMessage"
          className="
          notification is-danger is-light has-text-weight-normal
        "
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={hideErrorMessage}
          />
          {error && <span>{error}</span>}
        </div>
      )}
    </div>
  );
};
