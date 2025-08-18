import React, { useEffect, useRef, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import classNames from 'classnames';
import { FILTER, Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(FILTER.ALL);

  const [error, setError] = useState('');
  const errorTimerId = useRef(0);

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }
  const handleFilterChange = (filterParam: Filter) => {
    setFilter(filterParam);
  };

  useEffect(() => {
    setError('');
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch {
        setError('Unable to load todos');
        errorTimerId.current = window.setTimeout(() => setError(''), 3000);
      }
    };

    fetchTodos();

    return () => {
      if (errorTimerId.current) {
        window.clearTimeout(errorTimerId.current);
      }
    };
  }, []);

  const filteredTodos = todos.filter(todo => {
    return filter === FILTER.ALL
      ? true
      : (filter === FILTER.COMPLETED) === todo.completed;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
            />
          )}

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
        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filteredTodos} />
        </section>
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>
            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === FILTER.ALL,
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleFilterChange(FILTER.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === FILTER.ACTIVE,
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleFilterChange(FILTER.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === FILTER.COMPLETED,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilterChange(FILTER.COMPLETED)}
              >
                Completed
              </a>
            </nav>
            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
        {/* show only one message at a time */}
        {/* Unable to load todos +
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
