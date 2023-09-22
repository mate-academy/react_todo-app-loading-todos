/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { SelectFilter } from './utils/SelectFilters';

const USER_ID = 11553;
const UNABLE_LOAD_ERROR_MESSAGE = 'Unable to load todos';
const EMPTY_TITLE_ERROR_MESSAGE = 'Title should not be empty';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterOption, setFilterOption] = useState(SelectFilter.All);
  const someActiveToggle = todos.some(todo => !todo.completed);

  const setError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const activeTodosCounter = useMemo(() => {
    const activeTodos = todos.filter(todo => !todo.completed).length;

    return activeTodos;
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterOption) {
        case SelectFilter.Active: return !todo.completed;
        case SelectFilter.Completed: return todo.completed;
        case SelectFilter.All:
        default: return true;
      }
    });
  }, [todos, filterOption]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error: Error) => {
        setError(UNABLE_LOAD_ERROR_MESSAGE);
        // eslint-disable-next-line no-console
        console.log(error.message);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleTodoAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      setError(EMPTY_TITLE_ERROR_MESSAGE);

      return;
    }

    setNewTodoTitle('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {someActiveToggle && (
            <button
              type="button"
              className={cn(
                'todoapp__toggle-all',
                { active: !someActiveToggle },
              )}
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={handleTodoAdd}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={handleTitleChange}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={cn(
                'todo',
                { completed: todo.completed },
              )}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  defaultChecked={todo.completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
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
              {`${activeTodosCounter} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn(
                  'filter__link',
                  { selected: filterOption === SelectFilter.All },
                )}
                data-cy="FilterLinkAll"
                onClick={() => {
                  setFilterOption(SelectFilter.All);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn(
                  'filter__link',
                  { selected: filterOption === SelectFilter.Active },
                )}
                data-cy="FilterLinkActive"
                onClick={() => setFilterOption(SelectFilter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn(
                  'filter__link',
                  { selected: filterOption === SelectFilter.Completed },
                )}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterOption(SelectFilter.Completed)}
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
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          onClick={() => setErrorMessage('')}
          className="delete"
        />
        {errorMessage}
      </div>
    </div>
  );
};
