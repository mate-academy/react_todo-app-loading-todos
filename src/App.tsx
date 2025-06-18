/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, TodoError, TodoServiseErrors, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import cn from 'classnames';

enum StatusFilterOptions {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface GetFilteredTodosFilters {
  status: StatusFilterOptions;
}

const getFilteredTodos = (todos: Todo[], filter: GetFilteredTodosFilters) => {
  let filteredTodos = [...todos];

  if (filter.status !== StatusFilterOptions.All) {
    filteredTodos = filteredTodos.filter(todo => {
      if (filter.status === StatusFilterOptions.Completed) {
        return todo.completed;
      }

      return !todo.completed;
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(StatusFilterOptions.All);

  const [errorMessage, setErrorMesage] = useState<TodoError | null>(null);

  const handleHideError = useCallback(() => setErrorMesage(null), []);

  const showFooter = todos.length > 0;

  const filteredTodos = getFilteredTodos(todos, {
    status: statusFilter,
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMesage(TodoServiseErrors.UnableToLoad);
      })
      .finally(() => setTodosLoading(false));
  }, []);

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

        {!todosLoading && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  data-cy="Todo"
                  className={cn('todo', {
                    completed: todo.completed,
                  })}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
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

            {/* Hide the footer if there are no todos */}
            {showFooter && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {todos.filter(todo => !todo.completed).length} items left
                </span>

                {/* Active link should have the 'selected' class */}
                <nav className="filter" data-cy="Filter">
                  {Object.entries(StatusFilterOptions).map(([text, value]) => (
                    <a
                      key={value}
                      href={`#/${value !== 'all' ? value : ''}`}
                      className={cn('filter__link', {
                        selected: statusFilter === value,
                      })}
                      data-cy={`FilterLink${text}`}
                      onClick={() => setStatusFilter(value)}
                    >
                      {text}
                    </a>
                  ))}
                </nav>

                {/* this button should be disabled if there are no completed todos */}
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  data-cy="ClearCompletedButton"
                >
                  Clear completed
                </button>
              </footer>
            )}
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onHideError={handleHideError}
      />
    </div>
  );
};
