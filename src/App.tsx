/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import type { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import classNames from 'classnames';
import ErrorNotification from './components/ErrorNotification';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';

const errorMessages = {
  LOAD_TODOS: 'Unable to load todos',
  ADD_TODO: 'Unable to add a todo',
  DELETE_TODO: 'Unable to delete a todo',
  UPDATE_TODO: 'Unable to update a todo',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.COMPLETED) {
      return todo.completed;
    }

    if (filter === Filter.ACTIVE) {
      return !todo.completed;
    }

    return true;
  });

  const hasTodos = todos.length > 0;

  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  useEffect(() => {
    getTodos()
      .then(result => {
        setTodos(result);
      })
      .catch(() => setErrorMessage(errorMessages.LOAD_TODOS));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

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
            className={classNames('todoapp__toggle-all', {
              active: todos.length > 0 && todos.every(todo => todo.completed),
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
            />
          </form>
        </header>

        {hasTodos && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFooter
              itemsLeft={itemsLeft}
              setFilter={setFilter}
              filter={filter}
              completedCount={completedCount}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
