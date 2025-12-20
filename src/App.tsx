/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Filter } from './components/Filter';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }

    setError(null);
    setLoading(true);
    getTodos()
      .then(todosList => setTodos(todosList))
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (error) {
      timerId = setTimeout(() => setError(null), 3000);
    }

    return () => clearTimeout(timerId);
  }, [error]);

  const handleFilter = () => {
    switch (statusFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const handleNewTodo = (todo: Todo) => {
    return setTodos(currentTodos => [...currentTodos, todo]);
  };

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
              className={classNames('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <NewTodo
            setFormError={setError}
            inputField={inputField}
            onFormSubmit={handleNewTodo}
            todos={todos}
          />
        </header>

        {todos.length > 0 && !loading && (
          <>
            <TodoList todosList={handleFilter} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.filter(todo => !todo.completed).length + ' items left'}
              </span>

              <Filter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
              {/* <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: statusFilter === 'all',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: statusFilter === 'active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => setStatusFilter('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: statusFilter === 'completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setStatusFilter('completed')}
                >
                  Completed
                </a>
              </nav> */}

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!todos.some(todo => todo.completed)}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error === 'Unable to load todos' && 'Unable to load todos'}
        <br />
        {error === 'Title should not be empty' && 'Title should not be empty'}
        <br />
        {error === 'Unable to add a todo' && 'Unable to add a todo'}
        <br />
        {error === 'Unable to delete a todo' && 'Unable to delete a todo'}
        <br />
        {error === 'Unable to update a todo' && 'Unable to update a todo'}
      </div>
    </div>
  );
};
