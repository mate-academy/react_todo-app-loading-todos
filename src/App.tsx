/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 11926;

enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const filterTodos = (todos: Todo[], filter: FilterType) => {
  return todos.filter(todo => {
    switch (filter) {
      case FilterType.All:
        return true;

      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return true;
    }
  });
};

type SetErrorMessageType = React.Dispatch<React.SetStateAction<string | null>>;
type MessageType = string;

const handleErrorMessage = (
  setErrorMessage: SetErrorMessageType,
  message: MessageType,
) => {
  setErrorMessage(message);
  setTimeout(() => {
    setErrorMessage(null);
  }, 3000);
};

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>(
    FilterType.All,
  );
  const [isEditing, setIsEditing] = useState<Record<number, boolean>>({});

  const toggleEditing = (id: number) => {
    setIsEditing(prevIsEditing => ({
      ...prevIsEditing,
      [id]: !prevIsEditing[id],
    }));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos(USER_ID);

        setTodos(fetchedTodos);
      } catch (error) {
        if (error instanceof Error) {
          handleErrorMessage(
            setErrorMessage,
            error.message || 'Unable to load todos',
          );
        } else {
          handleErrorMessage(setErrorMessage, 'Unable to load todos');
        }
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = filterTodos(todos, currentFilter);

  const uncompletedCount = todos.filter(todo => !todo.completed).length;

  const allTodosAreActive = todos.every(todo => !todo.completed);

  const shouldShowFooter = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {filteredTodos.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {filteredTodos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(({ id, completed, title }) => (
              <div
                key={id}
                data-cy="Todo"
                className={classNames('todo', { completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                  />
                </label>
                {isEditing[id] ? (
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={title}
                  />
                ) : (
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onClick={() => toggleEditing(id)}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        toggleEditing(id);
                      }
                    }}
                  >
                    {title}
                  </span>
                )}
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
        )}

        {shouldShowFooter && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${uncompletedCount} ${
                uncompletedCount === 1 ? 'item' : 'items'
              } left`}
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: currentFilter === FilterType.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setCurrentFilter(FilterType.All)}
              >
                All
              </a>
              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: currentFilter === FilterType.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setCurrentFilter(FilterType.Active)}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: currentFilter === FilterType.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setCurrentFilter(FilterType.Completed)}
              >
                Completed
              </a>
            </nav>
            {!allTodosAreActive && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
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
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)} // Hide error on close button click
        />
        {errorMessage}
      </div>
    </div>
  );
};
