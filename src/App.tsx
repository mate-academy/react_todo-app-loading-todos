/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import classNames from 'classnames';

enum FilterType {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorLoad, setErrorLoad] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.all);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorLoad(true));

    setTimeout(() => {
      setErrorLoad(false);
    }, 3000);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const filteredTodos = useMemo((): Todo[] => {
    if (filterType === FilterType.all) {
      return todos;
    } else if (filterType === FilterType.active) {
      return todos.filter(todo => !todo.completed);
    } else if (filterType === FilterType.completed) {
      return todos.filter(todo => todo.completed);
    } else {
      return todos;
    }
  }, [filterType, todos]);

  const todosLeft = useMemo((): Todo[] => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      {/*#region TEST*/}
      <button onClick={() => {}}></button>
      {/*#endregion*/}

      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
              'is-hidden': !todos.length,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={inputRef}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {!todos.length || (
          <footer className={classNames('todoapp__footer')} data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosLeft.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                // className="filter__link selected"
                className={classNames('filter__link', {
                  selected: filterType === FilterType.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  const selectedValue = 'all' as FilterType;

                  setFilterType(selectedValue);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterType === FilterType.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  const selectedValue = 'active' as FilterType;

                  setFilterType(selectedValue);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterType === FilterType.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  const selectedValue = 'completed' as FilterType;

                  setFilterType(selectedValue);
                }}
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
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorLoad },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {!todos.length && `Unable to load todos`}
        {/*<br />*/}
        {/*Title should not be empty*/}
        {/*<br />*/}
        {/*Unable to add a todo*/}
        {/*<br />*/}
        {/*Unable to delete a todo*/}
        {/*<br />*/}
        {/*Unable to update a todo*/}
      </div>
    </div>
  );
};
