/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

enum FilterOption {
  Active= 'Active',
  Completed= 'Completed',
  default= '',
}

enum ErrorMessage {
  title= 'Title should not be empty',
  loading= 'Unable to load todos',
  default= '',
}

function filteredTodos(todos: Todo[], filterOption: FilterOption) {
  switch (filterOption) {
    case 'Active':
      return todos.filter(x => {
        return !x.completed;
      });
    case 'Completed':
      return todos.filter(x => {
        return x.completed;
      });
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOption>(FilterOption.default);
  const [errorMessage, setErrorMessage] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!todoTitle) {
      setErrorMessage(ErrorMessage.title);
    }
  }

  const usingTodos = filteredTodos(todos, filterOption);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setErrorMessage(ErrorMessage.loading);
      }
    })();

    setTodoTitle('');
    inputRef.current?.focus();

    return undefined;
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(ErrorMessage.default);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={e => setTodoTitle(e.target.value)}
              disabled={false}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {usingTodos.map(x => (
            <div
              data-cy="Todo"
              key={x.id}
              className={classNames('todo', { completed: x.completed })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={x.completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {x.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterOption === '',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterOption(FilterOption.default)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterOption === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterOption(FilterOption.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterOption === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterOption(FilterOption.Completed)}
              >
                Completed
              </a>
            </nav>

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

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          onClick={() => setErrorMessage(ErrorMessage.default)}
          type="button"
          className="delete"
        />
        {errorMessage}
      </div>
    </div>
  );
};
