/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const user = useContext<User | null>(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodos(user?.id ?? 0);

      setTodos(response);
      setLoading(false);
    } catch {
      setLoadingError('Unable to load a todo');
      setTimeout(() => setLoadingError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterType) {
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, filterType]);

  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all"
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </header>

        <section
          className="todoapp__main"
          data-cy="TodoList"
        >
          {visibleTodos.map(({ id, title, completed }) => (
            <div
              data-cy="Todo"
              className={classNames('todo', {
                completed,
              })}
              key={id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDeleteButton"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay">
                <div
                  className="modal-background has-background-white-ter"
                />
                {loading && <div className="loader" />}
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTodos.length} ${activeTodos.length <= 1 ? 'item' : 'items'} left`}
            </span>

            <nav className="filter" data-cy="Filter">
              {['All', 'Active', 'Completed'].map(item => (
                <a
                  key={item}
                  data-cy="FilterLinkAll"
                  href={`#/${item !== 'All' ? item.toLowerCase() : ''}`}
                  className={classNames('filter__link', {
                    selected: filterType === item,
                  })}
                  onClick={() => setFilterType(item)}
                >
                  {item}
                </a>
              ))}
            </nav>

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className={classNames('todoapp__clear-completed', {
                'todoapp__clear-completed-active': visibleTodos
                  .some(todo => todo.completed),
              })}
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
          {
            hidden: !loadingError,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setLoadingError('')}
        />

        {loadingError}
        <br />
      </div>
    </div>
  );
};
