/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import {
  todosService,
  TodosServiceErrors,
  todosServiceErrorText,
  USER_ID,
} from './api/todos';
import cn from 'classnames';
import { TodoItem } from './components/TodoItem';
import { TODO_STATUS_FILTER_OPTIONS, Status } from './types/TodoStatusFilter';
import { getFilteredTodos, Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState(Status.ALL);

  const handleRemoveError = () => setError('');

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(handleRemoveError, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  useEffect(() => {
    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setError(
          todosServiceErrorText[TodosServiceErrors.UNABLE_TO_LOAD_TODOS],
        );
      })
      .finally(() => {});
  }, []);

  const filteredTodos = getFilteredTodos(todos, selectedStatus);

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

        {filteredTodos.length !== 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </section>
        )}

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              {Object.entries(TODO_STATUS_FILTER_OPTIONS).map(
                ([option, { href, testId, text }]) => (
                  <a
                    key={testId}
                    href={href}
                    className={cn('filter__link', {
                      selected: selectedStatus === option,
                    })}
                    data-cy={testId}
                    onClick={event => {
                      event.preventDefault();
                      setSelectedStatus(option as Status);
                    }}
                  >
                    {text}
                  </a>
                ),
              )}
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
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleRemoveError}
        />
        {error}
      </div>
    </div>
  );
};
