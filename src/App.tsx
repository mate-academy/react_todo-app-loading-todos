/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import {
  TodosErrorsService,
  todosErrorsServiceText,
  todosServise,
  USER_ID,
} from './api/todos';
import { getFilteredTodos, Todo } from './types/Todo';
import cn from 'classnames';
import { TodoItems } from './components/TodoItems';
import {
  TodoStatusFilter,
  TODO_STATUS_FILTER_OPTIONS,
} from './components/TodoStatusFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(TodoStatusFilter.All);
  const [errorMessage, setErrorMessage] = useState('');
  const handleRemoveError = () => setErrorMessage('');
  const handleSubmit = (e: React.FormEvent) => e.preventDefault();

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(handleRemoveError, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  useEffect(() => {
    todosServise
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(
          todosErrorsServiceText[TodosErrorsService.UNABLE_TO_LOAD_TODOS],
        );
      })
      .finally(() => {});
  }, []);

  const filteredTodos = getFilteredTodos(todos, { status: selectedStatus });

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );

  const completedCount = useMemo(
    () => todos.filter(t => t.completed).length,
    [todos],
  );

  const allCompleted = todos.length > 0 && activeCount === 0;

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
            className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
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
              <TodoItems key={todo.id} todo={todo} />
            ))}
          </section>
        )}

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

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
                    onClick={() =>
                      setSelectedStatus(option as TodoStatusFilter)
                    }
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
              // Додано: атрибут disabled
              disabled={completedCount === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleRemoveError}
        />
        {errorMessage}
      </div>
    </div>
  );
};
