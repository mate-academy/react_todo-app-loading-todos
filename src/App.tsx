/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

enum QueryTodos {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function filterTodos(todos: Todo[], query: QueryTodos): Todo[] {
  return todos.filter(todo => {
    switch (query) {
      case QueryTodos.Active:
        return !todo.completed;
      case QueryTodos.Completed:
        return todo.completed;
      case QueryTodos.All:
      default:
        return true;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [titleTodo, setTitleTodo] = useState('');
  const [query, setQuery] = useState<QueryTodos>(QueryTodos.All);
  const activeTodosCount = filterTodos(todos, QueryTodos.Active).length;

  function loadTodos() {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(loadTodos, []);

  useEffect(() => {
    setPreparedTodos(filterTodos(todos, query));
  }, [query, todos]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setErrorMessage(''), 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage]);

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!titleTodo) {
      setErrorMessage('Title should not be empty');
    }
  };

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
          <form onSubmit={event => handleSumbit(event)}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={titleTodo}
              onChange={event => setTitleTodo(event.target.value)}
              autoFocus
            />
          </form>
        </header>

        {!isLoading && todos.length !== 0 ? (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {preparedTodos.map(todo => (
                <div
                  data-cy="Todo"
                  className={todo.completed ? 'todo completed' : 'todo'}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed ? true : false}
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

                  {/* overlay will cover the todo while it is being deleted or updated */}
                  <div data-cy="TodoLoader" className="modal overlay">
                    {/* eslint-disable-next-line max-len */}
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${activeTodosCount} items left`}
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={
                    query === QueryTodos.All
                      ? `filter__link selected`
                      : 'filter__link'
                  }
                  data-cy="FilterLinkAll"
                  onClick={() => setQuery(QueryTodos.All)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={
                    query === QueryTodos.Active
                      ? `filter__link selected`
                      : 'filter__link'
                  }
                  data-cy="FilterLinkActive"
                  onClick={() => setQuery(QueryTodos.Active)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={
                    query === QueryTodos.Completed
                      ? `filter__link selected`
                      : 'filter__link'
                  }
                  data-cy="FilterLinkCompleted"
                  onClick={() => setQuery(QueryTodos.Completed)}
                >
                  Completed
                </a>
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
          </>
        ) : (
          <div className="todoapp__loader">
            <div className="loader"></div>
          </div>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={
          errorMessage === ''
            ? 'notification is-danger is-light has-text-weight-normal hidden'
            : 'notification is-danger is-light has-text-weight-normal'
        }
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
