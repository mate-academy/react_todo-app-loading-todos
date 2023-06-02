/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './TodoList';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { TodoFilter } from './TodoFilter';

const USER_ID = 10603;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [isHidden, setIsHidden] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(setTodos).catch(() => {
        setError('Unable to load todos');
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    switch (filterType) {
      case 'all':
        filteredTodos = todos;
        break;
      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    return filteredTodos;
  }, [filterType, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">

          {todos.find(todo => !todo.completed) && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <TodoList
            todos={visibleTodos}
          />
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.length} items left`}
            </span>

            <TodoFilter
              filterType={filterType}
              setFilterType={setFilterType}
            />

            {todos.find(todo => todo.completed) && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        className={`notification is-danger is-light has-text-weight-normal ${isHidden ? 'hidden' : ''}`}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsHidden(true)}
        />
        {error && <p>{error}</p>}
        {/* show only one message at a time */}

        {/* {query && 'Unable to add a todo'}
        <br />
        {isClicked && 'Unable to delete a todo'}
        <br />
        Unable to update a todo
            */}
      </div>
    </div>
  );
};
