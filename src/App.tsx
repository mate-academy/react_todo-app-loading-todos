import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { getTodos } from './api/todos';

import { SortType } from './types/SortType';
import { Todo } from './types/Todo';

import { UserWarning } from './UserWarning';
import { filterTodos } from './utils/helpers';

import { TodoList } from './components/TodoList';
import { SearchBar } from './components/SearchBar';
import { TodoFooter } from './components/TodoFooter';

const USER_ID = 6749;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState<SortType>(SortType.ALL);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos(USER_ID);

        setTodos(fetchedTodos);
      } catch {
        setError('fetch');

        setTimeout(() => {
          setError('');
        }, 3000);
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleCloseError = () => {
    setError('');
  };

  const handleQuery = (title: string) => {
    setQuery(title);
  };

  const handlerSortType = (typeOfSort: SortType) => {
    setSortType(typeOfSort);
  };

  const visibleTodos = filterTodos(todos, sortType, query);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <SearchBar
            todos={visibleTodos}
            value={query}
            onInput={handleQuery}
          />
        </header>

        <TodoList todos={visibleTodos} />

        <TodoFooter
          todos={todos}
          filteredTodos={visibleTodos}
          sortType={sortType}
          onSelect={handlerSortType}
        />
      </div>

      <div
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={handleCloseError}
          aria-label="delete error message"
        />

        {`Unable to ${error} a todo`}
      </div>
    </div>
  );
};
