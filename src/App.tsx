/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import cn from 'classnames';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoRow } from './Components/TodoRow';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Status.ALL);

  const todosCount = todos.reduce((acc, val) => {
    if (!val.completed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const loadTodos = async () => {
    try {
      const todosData = await getTodos();

      setTodos(todosData);
    } catch (error) {
      setErrorMessage('Unable to load todos');
    }
  };

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      switch (filter) {
        case Status.ACTIVE:
          return !todo.completed;

        case Status.COMPLETED:
          return todo.completed;

        case Status.ALL:
        default:
          return true;
      }
    })
  ), [filter, todos]);

  const errorTimerId = useRef(0);

  const showErrorMessage = () => {
    if (errorTimerId.current) {
      clearTimeout(errorTimerId.current);
    }

    errorTimerId.current = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    showErrorMessage();
  }, [errorMessage]);

  useEffect(() => {
    loadTodos();
  }, []);

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
          {filteredTodos.map(todo => (
            <TodoRow
              todo={todo}
              key={todo.id}
            />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0
        && (
          <footer className="todoapp__footer" data-cy="Footer">
            {/* Hide the footer if there are no todos */}
            <span className="todo-count" data-cy="TodosCounter">
              {`${todosCount} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link',
                  { selected: filter === Status.ALL })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(Status.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn(
                  'filter__link',
                  { selected: filter === Status.ACTIVE },
                )}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(Status.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link',
                  { selected: filter === Status.COMPLETED })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(Status.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
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

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal', {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setErrorMessage('');
          }}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
