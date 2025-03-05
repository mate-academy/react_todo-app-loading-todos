/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import classNames from 'classnames';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [shownTodos, setShownTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [todosFilter, setTodosFilter] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const focusedTodoRef = useRef<HTMLInputElement>(null);
  const classNameLoader = 'modal-background has-background-white-ter';

  function showError(errMessage: string) {
    if (errMessage) {
      setErrorMessage(errMessage);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setShownTodos(todos);
      })
      .catch(error => {
        showError('Unable to load todos');
        throw error;
      });
  }, []);

  useEffect(() => {
    function filterTodos(filter: string) {
      switch (filter) {
        case 'active':
          return todosFromServer.filter(todo => !todo.completed);
        case 'completed':
          return todosFromServer.filter(todo => todo.completed);
        default:
          return todosFromServer;
      }
    }

    setShownTodos(filterTodos(todosFilter));
  }, [todosFilter, todosFromServer]);

  useEffect(() => {
    focusedTodoRef.current?.focus();
  }, [focusedTodoRef, selectedTodo]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main" data-cy="TodoList">
          {shownTodos.length !== 0 && (
            <div>
              {shownTodos.map(todo => (
                <div
                  data-cy="Todo"
                  className={classNames('todo', {
                    'todo completed': todo.completed,
                  })}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      defaultChecked={todo.completed && true}
                    />
                  </label>

                  {todo !== selectedTodo ? (
                    <>
                      <span
                        data-cy="TodoTitle"
                        className="todo__title"
                        onDoubleClick={() => setSelectedTodo(todo)}
                      >
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
                    </>
                  ) : (
                    <form>
                      <input
                        data-cy="TodoTitleField"
                        type="text"
                        className="todo__title-field"
                        placeholder="Empty todo will be deleted"
                        value="Todo is being edited now"
                        onBlur={() => setSelectedTodo(undefined)}
                        ref={focusedTodoRef}
                      />
                    </form>
                  )}

                  {/* overlay will cover the todo while it is being deleted or updated */}
                  <div data-cy="TodoLoader" className="modal overlay">
                    <div className={classNameLoader} />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Hide the footer if there are no todos */}
        {todosFromServer.length !== 0 && (
          <Footer
            todosFromServer={todosFromServer}
            todosFilter={todosFilter}
            setTodosFilter={setTodosFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
