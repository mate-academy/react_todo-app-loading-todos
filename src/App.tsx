/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthProvider, AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

enum Status {
  All = 'all',
  Active = 'active',
  Completed= 'completed',
}

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState< Todo[]>([]);
  const [selectStatus, setSelectStatus] = useState(Status.All);
  const [error, setError] = useState(false);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 2000)
  }

  const filterStatus = [...todos].filter(todo => {
    switch (selectStatus) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return todo;
    }
  })

  const loadTodos = async () => {
    if (user?.id) {
      const todos = await getTodos(user.id);
      setTodos(todos);
    }
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);



  return (
    <AuthProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header">
            {todos.length > 0 && (
              <button
                data-cy="ToggleAllButton"
                type="button"
                className="todoapp__toggle-all active"
              />
            )}

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

          <section className="todoapp__main" data-cy="TodoList">
            {filterStatus.map(todo => (
                <div
                  data-cy="Todo"
                  className={classNames(
                    'todo',
                    { 'completed': todo.completed },
                  )}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      defaultChecked
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">{todo.title}</span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDeleteButton"
                  >
                    ×
                  </button>

                  <div data-cy="TodoLoader" className="modal overlay">
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))
            }
          </section>

          {todos.length > 0 && (
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {todos.length} items left
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={classNames('filter__link', {'selected': selectStatus === Status.All})}
                  onClick={() => setSelectStatus(Status.All)}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={classNames('filter__link', {'selected': selectStatus === Status.Active})}
                  onClick={() => setSelectStatus(Status.Active)}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={classNames('filter__link', {'selected': selectStatus === Status.Completed})}
                  onClick={() => setSelectStatus(Status.Completed)}
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
          )}
        </div>

        { error && <div
          data-cy="ErrorNotification"
          className={classNames(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !error },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setError(false)}
          />

          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>}
      </div>
    </AuthProvider>
  );
};
