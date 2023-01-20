/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';

import { fetchTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Filter } from './components/React/Filter';
import { NewTodo } from './components/React/NewTodo';
import { TodoList } from './components/React/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const handleAllTodos = () => {
    setFilter('all');
  };

  const handleActiveTodos = () => {
    setFilter('active');
  };

  const handleCompletedTodos = () => {
    setFilter('completed');
  };

  const matchTheError = (errorType: string) => {
    if (!errorType) {
      return '';
    }

    switch (errorType) {
      case 'ServerFail':
        return 'Unable to load data from the Server';

      case 'Add':
        return 'Unable to add a todo';

      case 'Delete':
        return 'Unable to delete a todo';

      case 'Update':
        return 'Unable to update a todo';

      default:
        return 'Unknown Error';
    }
  };

  const handleErrorCloser = () => {
    setError('');
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      fetchTodos(user.id, setTodos, setError);
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all"
          />

          <NewTodo newTodoField={newTodoField} />
        </header>

        {!!todos.length && (
          <>
            <TodoList
              todos={todos}
              filter={filter}
            />
            <Filter
              todos={todos}
              onAllClick={handleAllTodos}
              onActiveClick={handleActiveTodos}
              onCompletedClick={handleCompletedTodos}
              filter={filter}
            />
          </>
        )}
      </div>

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
          onClick={() => handleErrorCloser()}
        />
        {matchTheError(error)}
      </div>
    </div>
  );
};
