/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';
import { getFilteredList } from './utils/getFilteredList';
import { errorMessages, ErrorMessages } from './types/ErrorMessages';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[] | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.all);

  const [error, setError] = useState<ErrorMessages | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => setTodosList(data))
      .catch(() => {
        setError(errorMessages.load);
      });
  }, []);

  useEffect(() => {
    let timerId = 0;

    if (error) {
      timerId = window.setTimeout(() => setError(null), 3000);
    }

    return () => clearTimeout(timerId);
  }, [error]);

  function handleHideError() {
    setError(null);
  }

  const filteredList = getFilteredList(filter, todosList);
  const activeListLength = getFilteredList(Filter.active, todosList)?.length;

  function handleAddingTodo(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!event.currentTarget.value) {
        setError(errorMessages.title);
      }
    }
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
              onKeyDown={handleAddingTodo}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredList?.map(todo => (
            <div
              data-cy="Todo"
              className={cn('todo', { completed: todo.completed })}
              key={todo.id}
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
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {Array.isArray(todosList) && todosList.length > 0 && (
          <Footer
            onSetFilter={setFilter}
            activeListLength={activeListLength}
            filter={filter}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleHideError}
        />
        {error}
      </div>
    </div>
  );
};
