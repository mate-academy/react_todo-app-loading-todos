/* eslint-disable no-console */
import React from 'react';
import classNames from 'classnames';
import { USER_ID } from './api/todosMethods';
import { UserWarning } from './UserWarning';
import { useTodos, FilterStatus } from './hooks/useTodos';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const todoListState = useTodos();
  const {
    todos,
    error,
    setError,
    filterStatus,
    setFilterStatus,
    loadingTodo,
    setLoadingTodo,
    query,
    setQuery,
    handleSubmit,
    activeCount,
  } = todoListState;

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
            className="todoapp__toggle-all is-active"
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={event => setQuery(event.target.value)}
              disabled={loadingTodo !== null}
            />
          </form>
        </header>

        <TodoList
          todoListState={todoListState}
          query={query}
          setQuery={setQuery}
          loadingTodoId={loadingTodo}
          setLoadingTodoId={setLoadingTodo}
        />

        {todos.length > 0 ? (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {Object.values(FilterStatus).map(value => (
                <a
                  key={value}
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filterStatus === value,
                  })}
                  data-cy={`FilterLink${value}`}
                  onClick={() => setFilterStatus(value)}
                >
                  {value}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        ) : (
          <>no Todos Left</>
        )}

        <ErrorNotification error={error} setError={setError} />
      </div>
    </div>
  );
};
