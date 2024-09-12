import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { TodoFooter } from './components/TodoFooter';
import { TodoFilter } from './types/TodoFilter';
import { getFilteredList } from './utils/getFilteredList';
import { ErrorMessages, ErrorMessage } from './types//BoxErrorMessages';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[] | null>(null);
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);

  const [error, setError] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => setTodosList(data))
      .catch(() => {
        setError(ErrorMessages.Load);
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
  const activeListLength = getFilteredList(
    TodoFilter.Active,
    todosList,
  )?.length;

  function handleAddingTodo(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!event.currentTarget.value) {
        setError(ErrorMessages.Title);
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
              <label
                htmlFor={`todo-status-${todo.id}`}
                className="todo__status-label"
              >
                {' '}
                <input
                  id={`todo-status-${todo.id}`}
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
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
        {Array.isArray(todosList) && todosList.length > 0 && (
          <TodoFooter
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
