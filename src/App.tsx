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

enum Errors {
  Server = 'Unable to load data from the Server',
  Add = 'Unable to add a todo',
  Delete = 'Unable to delete a todo',
  Update = 'Unable to update a todo',
}

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const handleTodosFilter = (filterType: string) => {
    setFilter(filterType);
  };

  const handleErrorCloser = () => {
    setError('');
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      fetchTodos(user.id, setTodos, setError, Errors.Server);
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
              onFilterChange={handleTodosFilter}
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
        {error}
      </div>
    </div>
  );
};
