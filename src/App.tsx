/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useMemo, useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { TodoElement } from './components/TodoElement/TodoElement';
import { useDidUpdateEffect } from './utils/useDidUpdate';
import { ErrorMessage } from './types/ErrorMassage';
import { FilterType } from './types/FilterType';
import { todosFilter } from './utils/todosFilter';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const [hidden, setHidden] = useState(true);
  const [filterCriteria, setFilterCriteria] = useState(FilterType.All);
  const [error, setError] = useState(ErrorMessage.Null);

  useDidUpdateEffect(() => {
    setTimeout(() => setHidden(true), 3000);
  }, [hidden]);

  const { data: todos, isLoading } = useQuery(
    ['todos', user?.id],
    () => getTodos(user!.id),
    {
      enabled: !!user,
    },
  );
  const handleUpdate = () => {
    setError(ErrorMessage.Update);
    setHidden(false);
  };

  const handleDelete = () => {
    setError(ErrorMessage.Delete);
    setHidden(false);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setError(ErrorMessage.Add);
      setHidden(false);
    }
  };

  const filteredTodos = useMemo(
    () => todos && todosFilter(filterCriteria, todos),
    [todos, filterCriteria],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
            onClick={handleUpdate}
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onKeyDown={handleSubmit}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {isLoading && (
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          )}
          {todos && filteredTodos?.map((todo) => (
            <TodoElement
              todo={todo}
              key={todo.id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </section>

        { !!todos?.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todos?.length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                href="#/"
                className={classNames(
                  'filter__link',
                  { selected: filterCriteria === FilterType.All },
                )}
                onClick={(event) => {
                  event.preventDefault();
                  setFilterCriteria(FilterType.All);
                }}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                href="#/active"
                className={classNames(
                  'filter__link',
                  { selected: filterCriteria === FilterType.Active },
                )}
                onClick={(event) => {
                  event.preventDefault();
                  setFilterCriteria(FilterType.Active);
                }}
              >
                Active
              </a>
              <a
                data-cy="FilterLinkCompleted"
                href="#/completed"
                className={classNames(
                  'filter__link',
                  { selected: filterCriteria === FilterType.Completed },
                )}
                onClick={(event) => {
                  event.preventDefault();
                  setFilterCriteria(FilterType.Completed);
                }}
              >
                Completed
              </a>
            </nav>

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHidden(true)}
        />
        {error === ErrorMessage.Add && 'Unable to add a todo'}
        {error === ErrorMessage.Delete && 'Unable to delete a todo'}
        {error === ErrorMessage.Update && 'Unable to update a todo'}
      </div>
    </div>
  );
};
