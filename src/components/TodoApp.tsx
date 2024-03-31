/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { ErrorNotification } from './ErrorNotification';
import { Filter } from './Filter';
import { TodoList } from './TodoList';
import { Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { ErrorMessages } from '../types/ErrorMessages';
import { FilterOptions } from '../types/FilterOptions';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages | null>(null);
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);

  const visibleTodos = [...todos].filter(todo => {
    switch (filter) {
      case FilterOptions.Active:
        return !todo.completed;

      case FilterOptions.Completed:
        return todo.completed;

      case FilterOptions.All:
      default:
        return true;
    }
  });

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const clearError = () => setErrorMessage(null);

  const showError = (error: ErrorMessages) => {
    setErrorMessage(error);

    setTimeout(() => {
      clearError();
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessages.LoadTodos));
  }, []);

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

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${itemsLeft} item${itemsLeft > 1 ? 's' : ''} left`}
            </span>

            <Filter filter={filter} setFilter={setFilter} />

            {/* this button should be disabled if there are no completed todos */}
            {todos.find(todo => todo.completed) && (
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

      <ErrorNotification errorMessage={errorMessage} clearError={clearError} />
    </div>
  );
};
