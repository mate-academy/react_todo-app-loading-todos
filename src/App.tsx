/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Error } from './types/Error';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosAreLoaded, setTodosAreLoaded] = useState(false);
  const [error, setError] = useState<Error>(Error.NONE);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const handleErrorButtonClick = () => {
    setError(Error.NONE);
  };

  useEffect(() => {
    const getTodosFromApi = async () => {
      try {
        const userId = user ? user.id : 1;
        const todosFromApi = await getTodos(userId);

        setTodos(todosFromApi);
        setTodosAreLoaded(true);

        return 0;
      } catch (err) {
        setError(Error.ADD);

        const timerId = setTimeout(() => {
          setError(Error.NONE);
        }, 3000);

        return () => clearTimeout(timerId);
      }
    };
    // focus the element with `ref={newTodoField}`

    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromApi();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed;
      case Filter.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todosAreLoaded && (
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
        {todosAreLoaded && (
          <section className="todoapp__main" data-cy="TodoList">
            {
              filteredTodos.map(todo => {
                return (
                  <div
                    data-cy="Todo"
                    className={cn('todo',
                      { completed: todo.completed })}
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

                    <span data-cy="TodoTitle" className="todo__title">
                      {todo.title}
                    </span>
                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDeleteButton"
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
                );
              })
            }
          </section>
        )}
        {todosAreLoaded && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              4 items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                href="#/"
                className={cn('filter__link',
                  {
                    selected: filter === Filter.ALL,
                  })}
                onClick={() => {
                  setFilter(Filter.ALL);
                }}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                href="#/active"
                className={cn('filter__link',
                  {
                    selected: filter === Filter.ACTIVE,
                  })}
                onClick={() => {
                  setFilter(Filter.ACTIVE);
                }}
              >
                Active
              </a>
              <a
                data-cy="FilterLinkCompleted"
                href="#/completed"
                // className="filter__link"
                className={cn('filter__link',
                  {
                    selected: filter === Filter.COMPLETED,
                  })}
                onClick={() => {
                  setFilter(Filter.COMPLETED);
                }}
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

      <div
        data-cy="ErrorNotification"
        className={cn('notification is-danger is-light has-text-weight-normal',
          {
            hidden: error === Error.NONE,
          })}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleErrorButtonClick}
        />

        {error === Error.ADD && 'Unable to add a todo'}
        {error === Error.DELETE && 'Unable to delete a todo'}
        {error === Error.UPDATE && 'Unable to update a todo'}
      </div>
    </div>
  );
};
