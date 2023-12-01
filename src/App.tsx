/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { ErrorMessage } from './types/ErrorMessage';
import { getTodos } from './api/todos';

const USER_ID = 11811;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [errorMessage, setErrorMessage]
    = useState<ErrorMessage>(ErrorMessage.Any);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage(ErrorMessage.UnableToLoad);
        setTimeout(() => setErrorMessage(ErrorMessage.Any), 3000);
        throw error;
      });
  }, []);

  useEffect(() => {
    switch (filterBy) {
      case FilterBy.Active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case FilterBy.Completed:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      case FilterBy.All:
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [filterBy, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames(
              'todoapp__toggle-all',
              { active: true },
            )}
            data-cy="ToggleAllButton"
          />

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
              className={classNames('todo', { completed: todo.completed })}
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

              <span
                data-cy="TodoTitle"
                className="todo__title"
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={classNames(
                  'modal',
                  'overlay',
                  { 'is-active': false },
                )}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todos.filter(todo => !todo.completed).length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link',
                  { selected: filterBy === FilterBy.All },
                )}
                data-cy="FilterLinkAll"
                onClick={() => setFilterBy(FilterBy.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: filterBy === FilterBy.Active },
                )}
                data-cy="FilterLinkActive"
                onClick={() => setFilterBy(FilterBy.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: filterBy === FilterBy.Completed },
                )}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterBy(FilterBy.Completed)}
              >
                Completed
              </a>
            </nav>

            {true && (
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

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: errorMessage === ErrorMessage.Any },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(ErrorMessage.Any)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
