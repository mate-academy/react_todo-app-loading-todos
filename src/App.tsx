/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [edit, setEdit] = useState(false);
  const [status, setStaus] = useState('all');
  const [showNotification, setShowNotification] = useState(false);

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      });
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (status === 'active') {
        return todo.completed === false;
      }

      if (status === 'completed') {
        return todo.completed === true;
      }

      return todo;
    });
  }, [status, todos]);

  const activeItems = todos.filter(todo => todo.completed === false);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
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
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              className={`todo ${todo.completed ? 'completed' : ''}`}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              {edit ? (
                <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={todo.title}
                    onBlur={() => setEdit(false)}
                  />
                </form>
              ) : (
                <>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => setEdit(true)}
                  >
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>
                </>
              )}

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeItems.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${status === 'all' && 'selected'}`}
                data-cy="FilterLinkAll"
                onClick={() => setStaus('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${status === 'active' && 'selected'}`}
                data-cy="FilterLinkActive"
                onClick={() => setStaus('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${status === 'completed' && 'selected'}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setStaus('completed')}
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
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`
        notification
        is-danger
        is-light
        has-text-weight-normal
        ${!showNotification ? 'hidden' : ''}
        `}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setShowNotification(false)}
        />
        {/* show only one message at a time */}
        {errorMessage}
        <br />
      </div>
    </div>
  );
};
