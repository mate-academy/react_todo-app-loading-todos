/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import Todos from './components/Todos/Todos';
import cn from 'classnames';

enum FilterStatus {
  All,
  Active,
  Completed,
}

enum ErrorMessage {
  None,
  LoadTodos,
  EmptyTitle,
  AddTodo,
  DeleteTodo,
  UpdateTodo,
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleErrorMessage = (msgType: ErrorMessage) => {
    switch (msgType) {
      case ErrorMessage.LoadTodos:
        setErrorMsg('Unable to load todos');
        break;

      case ErrorMessage.EmptyTitle:
        setErrorMsg('Title should not be empty');
        break;

      case ErrorMessage.AddTodo:
        setErrorMsg('Unable to add a todo');
        break;

      case ErrorMessage.DeleteTodo:
        setErrorMsg('Unable to delete a todo');
        break;

      case ErrorMessage.UpdateTodo:
        setErrorMsg('Unable to update a todo');
        break;

      case ErrorMessage.None:
      default:
        setErrorMsg('');
        break;
    }

    setTimeout(() => {
      setErrorMsg('');
    }, 3000);
  };

  const handleTodoToggle = useCallback(
    (todoId: number) => {
      setTodos(
        todos.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        }),
      );
    },
    [todos],
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        handleErrorMessage(ErrorMessage.LoadTodos);
      });
  }, []);

  const handleFilterChange = (filter: FilterStatus) => {
    setFilterStatus(filter);
  };

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return todos.filter(todo => !todo.completed);

      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);

      case FilterStatus.All:
      default:
        return todos;
    }

    return todos;
  }, [todos, filterStatus]);

  const undoneTodosCount = todos.reduce(
    (acc, todo) => (todo.completed ? acc : acc + 1),
    0,
  );
  const isAllTodosCompleted = undoneTodosCount === 0 && todos.length > 0;
  const isAnyTodosCompleted = undoneTodosCount > 0;

  const handleToggleAll = () => {
    if (isAllTodosCompleted) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos(todos.map(todo => ({ ...todo, completed: true })));
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: isAllTodosCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={() => handleToggleAll()}
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <Todos todos={visibleTodos} handleTodoToggle={handleTodoToggle} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {undoneTodosCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleFilterChange(FilterStatus.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleFilterChange(FilterStatus.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterStatus === FilterStatus.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilterChange(FilterStatus.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              disabled={!isAnyTodosCompleted}
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
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMsg },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => handleErrorMessage(ErrorMessage.None)}
        />
        {errorMsg}
      </div>
    </div>
  );
};
