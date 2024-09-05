/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { ErrorMessages } from './types/Errors';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  // #region states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editedTodoId] = useState<number | null>(null);
  const [loadingTodosIds] = useState<number[]>([]);
  // #endregion

  // #region filterStatus and  filter handling
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const getFilteredTodos = useCallback(
    (currentTodos: Todo[], status: FilterStatus) => {
      let filteredTodos = [...currentTodos];

      if (status) {
        filteredTodos =
          status === FilterStatus.Completed ? completedTodos : activeTodos;
      }

      return filteredTodos;
    },
    [activeTodos, completedTodos],
  );

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filterStatus),
    [getFilteredTodos, todos, filterStatus],
  );
  // #endregion

  // #region errors and notification handling
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.None,
  );

  const errorNotification = useRef<HTMLDivElement>(null);

  const deleteNotification = () => {
    errorNotification.current?.classList.add('hidden');
  };
  // #endregion

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessages.Loading);
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      errorNotification.current?.classList.remove('hidden');

      setTimeout(deleteNotification, 3000);
    }
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
              className={cn('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              onClick={() => {
                setTodos(currentTodos => {
                  return currentTodos.some(todo => !todo.completed)
                    ? currentTodos.map(todo => ({ ...todo, completed: true }))
                    : currentTodos.map(todo => ({ ...todo, completed: false }));
                });
              }}
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

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              className={cn('todo', {
                completed: todo.completed,
              })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={e => {
                    setTodos(currentTodos => {
                      const index = currentTodos.indexOf(todo);
                      const newTodo = {
                        ...todo,
                        completed: e.target.checked,
                      };

                      return [
                        ...currentTodos.slice(0, index),
                        newTodo,
                        ...currentTodos.slice(index + 1),
                      ];
                    });
                  }}
                />
              </label>

              {editedTodoId === todo.id ? (
                <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={todo.title}
                  />
                </form>
              ) : (
                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
              )}

              {editedTodoId !== todo.id && (
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>
              )}

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div
                data-cy="TodoLoader"
                className={cn('modal overlay', {
                  'is-active': loadingTodosIds.includes(todo.id),
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos.length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  setFilterStatus(FilterStatus.All);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  setFilterStatus(FilterStatus.Active);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  setFilterStatus(FilterStatus.Completed);
                }}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => {
                setTodos(activeTodos);
              }}
              disabled={!completedTodos.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        ref={errorNotification}
        data-cy="ErrorNotification"
        className="
          notification is-danger is-light 
          has-text-weight-normal hidden
        "
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={deleteNotification}
        />

        {errorMessage}
      </div>
    </div>
  );
};
