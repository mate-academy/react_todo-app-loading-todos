/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Errors } from './types/Errors';
import { Filter } from './types/Filters';
import { FooterComponent } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const inputFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
      })
      .catch(() => setError(Errors.Loading));

    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    setTimeout(() => {
      setError(null);
    }, 3000);

    const timer = window.setTimeout(() => {
      setError(null);
    }, 3000);

    window.clearTimeout(timer);
  }, [error]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', { active: todos })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={inputFocus}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos &&
            visibleTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', { completed: todo.completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => {
                      setTodos(prevTodos =>
                        prevTodos.map(item =>
                          item.id === todo.id
                            ? { ...item, completed: !item.completed }
                            : item,
                        ),
                      );
                    }}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
        </section>

        {todos.length > 0 && (
          <FooterComponent todos={todos} filter={filter} onFilter={setFilter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {error}
      </div>
    </div>
  );
};
