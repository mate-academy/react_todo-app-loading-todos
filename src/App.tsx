/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { Filters } from './types/Filtres';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorHidden, setIsErrorHidden] = useState(true);
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setIsErrorHidden(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setSelectedTodos(todosFromServer);
      })
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setIsErrorHidden(false);

      const timer = setTimeout(() => {
        setIsErrorHidden(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const activeTodos = todos.filter(todo => !todo.completed);

  const getSelectedTodos = (selected: Filters) => {
    setFilter(selected);

    switch (selected) {
      case Filters.Completed:
        setSelectedTodos(todos.filter(todo => todo.completed));
        break;

      case Filters.Active:
        setSelectedTodos(todos.filter(todo => !todo.completed));
        break;

      case Filters.All:
      default:
        setSelectedTodos(todos);
        break;
    }
  };

  const visibleFooter = todos.length !== 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {visibleFooter && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {selectedTodos.map(todo => {
          return (
            <section key={todo.id} className="todoapp__main" data-cy="TodoList">
              <div
                data-cy="Todo"
                className={cn('todo', { 'todo completed': todo.completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => {}}
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
            </section>
          );
        })}

        {visibleFooter && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  'filter__link selected': filter === Filters.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => getSelectedTodos(Filters.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  'filter__link selected': filter === Filters.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => getSelectedTodos(Filters.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  'filter__link selected': filter === Filters.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => getSelectedTodos(Filters.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
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
          { hidden: isErrorHidden || loading || !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsErrorHidden(true)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
