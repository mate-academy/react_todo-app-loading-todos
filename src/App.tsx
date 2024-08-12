/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTypes } from './types/FilterTypes';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<FilterTypes>(
    FilterTypes.All,
  );
  const [isErrorHidden, setIsErrorHidden] = useState(true);

  const areTodosExist = todos.length !== 0;
  const notCompletedTodos = todos.filter(todo => !todo.completed).length;

  let filteredTodos = [...todos];

  if (selectedTodos === FilterTypes.Active) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (selectedTodos === FilterTypes.Completed) {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setIsErrorHidden(false);
        alert(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsErrorHidden(true);
        }, 3000);
      });
  }, []);

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
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {areTodosExist && <TodoList todos={filteredTodos} />}
        {/* Hide the footer if there are no todos */}
        {areTodosExist && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {notCompletedTodos} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: selectedTodos === FilterTypes.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  if (selectedTodos !== FilterTypes.All) {
                    setSelectedTodos(FilterTypes.All);
                  }
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: selectedTodos === FilterTypes.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  if (selectedTodos !== FilterTypes.Active) {
                    setSelectedTodos(FilterTypes.Active);
                  }
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selectedTodos === FilterTypes.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  if (selectedTodos !== FilterTypes.Completed) {
                    setSelectedTodos(FilterTypes.Completed);
                  }
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
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: isErrorHidden },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsErrorHidden(true)}
        />
        {/* show only one message at a time */}
        Unable to load todos
      </div>
    </div>
  );
};
