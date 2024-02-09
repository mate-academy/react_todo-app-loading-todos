/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Status } from './types/Status';
import { Footer } from './api/Footer';
import { Header } from './api/Header';

const USER_ID = 136;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    switch (status) {
      case Status.All:
        getTodos(USER_ID).then(setTodos);
        break;
      case Status.Active:
        setTodos(prevTodos => prevTodos.filter(t => !t.completed));
        break;
      case Status.Completed:
        setTodos(prevTodos => prevTodos.filter(t => t.completed));
        break;
      default:
        break;
    }
  }, [status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleCheckTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.map(todo => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  setTimeout(() => {
    setIsError(false);
  }, 3000);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          setTodos={setTodos}
          todos={todos}
        />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {/* This is a completed todo */}
              {todos.map(todo => (
                <div
                  data-cy="Todo"
                  className={cn('todo', { completed: todo.completed })}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => handleCheckTodo(todo.id)}
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

                  {/* overlay will cover the todo while it is being updated */}
                  {isLoading && (
                    <div data-cy="TodoLoader" className="modal overlay">
                      <div
                        className="modal-background has-background-white-ter"
                      />
                      <div className="loader" />
                    </div>
                  )}
                </div>
              ))}

              {/* This todo is not completed */}
              {false && (
                <div data-cy="Todo" className="todo">
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    Not Completed Todo
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>

                  <div data-cy="TodoLoader" className="modal overlay">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              )}

              {/* This todo is being edited */}
              {false && (
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
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              )}

              {/* This todo is in loadind state */}
              {false && (
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

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>

                  {/* 'is-active' class puts this modal on top of the todo */}
                  <div data-cy="TodoLoader" className="modal overlay is-active">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              )}
            </section>

            <Footer
              status={status}
              setStatus={setStatus}
              todos={todos}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !isError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsError(false)}
        />
        {/* show only one message at a time */}
        {isError && (
          <span>Unable to load todos</span>
        )}
        {/* <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
      </div>
    </div>
  );
};
