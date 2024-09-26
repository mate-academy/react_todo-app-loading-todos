/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import cl from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

function filteredTodos(
  allTodos: Todo[] | undefined,
  filter: Status,
): Todo[] | null {
  if (!allTodos) {
    return null;
  }

  return allTodos.filter(t => {
    switch (filter) {
      case Status.ACTIVE:
        return !t.completed;

      case Status.COMPLETED:
        return t.completed;

      default:
        return true;
    }
  });
}

export const App: React.FC = () => {
  const [filter, setFilter] = useState(Status.ALL);
  const [todos, setTodos] = useState<Todo[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const visibleTodos = filteredTodos(todos, filter);

  useEffect(() => {
    ref.current?.focus();
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, [filter]);

  const closeError = () => {
    setErrorMessage('');
  };

  const activeTodos = todos?.filter(todo => !todo.completed);

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
            className={cl('todoapp__toggle-all', {
              active: activeTodos?.length === 0,
              hidden: todos?.length === 0,
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
              ref={ref}
            />
          </form>
        </header>

        {visibleTodos && <TodoList todos={visibleTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos && todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos?.length} items left`}
            </span>

            <Filter setFilter={setFilter} filter={filter} />

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todos?.some(t => t.completed)}
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
        className={cl(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeError}
        />

        {errorMessage}
      </div>
    </div>
  );
};
