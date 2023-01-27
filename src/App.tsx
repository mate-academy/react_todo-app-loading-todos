import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import classnames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { TodosList } from './components/TodosList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Navigation } from './components/Navigation';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<any>([]);
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('All');

  const changeStatusOnClick = (event: React.MouseEvent) => {
    setStatus(event.currentTarget.innerHTML);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then((loadedTodos) => {
          setTodos(loadedTodos);
        })
        .catch(() => {
          setError(true);
        });
    }

    setTimeout(() => {
      setError(false);
    }, 3000);
  }, []);

  function filterStatus(value: string) {
    switch (value) {
      case 'All':
        return todos;

      case 'Active':
        return todos.filter((todo: Todo) => !todo.completed);

      case 'Completed':
        return todos.filter((todo: Todo) => todo.completed);

      default:
        return null;
    }
  }

  const updatedTodos = filterStatus(status);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
            aria-label="Mark all as complete"
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

        <TodosList setOfItems={updatedTodos} />
        {todos.length ? (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {todos.length}
              {' '}
              items left
            </span>

            <Navigation changeFunction={changeStatusOnClick} />
            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>

          </footer>
        ) : null}

      </div>

      {error ? (
        <div
          data-cy="ErrorNotification"
          className={classnames({
            notification: true,
            'is-danger': true,
            'is-light': true,
            'has-text-weight-normal': true,
            hidden: !error,
          })}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            aria-label="hide-error-button"
          />

          Unable to fetch data
          <br />

        </div>
      ) : null}
    </div>
  );
};
