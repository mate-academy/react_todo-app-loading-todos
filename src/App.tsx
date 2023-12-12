/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

const USER_ID = 12005;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.All);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]); // Initialize with an empty array
  const activeTodos = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    setErrorMessage('');

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  useEffect(() => {
    // Use filteredTodos instead of 't'
    setVisibleTodos(filteredTodos);
  }, [filter, todos, filteredTodos]); // Include filteredTodos in the dependency array

  const filteredTodos = useMemo(() => {
    let copyTodos = [...todos];

    switch (filter) {
      case Filter.Active:
        copyTodos = copyTodos.filter(todo => !todo.completed);
        break;

      case Filter.Completed:
        copyTodos = copyTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return copyTodos;
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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

        <section className="todoapp__main" data-cy="TodoList">
           {visibleTodos.map(todo => (
        <div
            key={todo.id}  
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            >
        </div>

            >
              const { completed } = todo;

                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
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

              </div>
            </div>
          ))}

        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos === 1
                ? '1 item left'
                : `${activeTodos} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link',
                  { selected: filter === Filter.All })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(Filter.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link',
                  { selected: filter === Filter.Active })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(Filter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link',
                  { selected: filter === Filter.Completed })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(Filter.Completed)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
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

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};

