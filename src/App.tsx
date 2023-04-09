import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Todo } from './types/Todo';
import { FilterType } from './enums/FilterType';

import { getVisibleTodos } from './utils/getVisibleTodos';

import { getTodos } from './api/todos';

import { ListFilter } from './components/ListFilter';
import { TodoList } from './components/TodosList';
import { Header } from './components/Header';

const USER_ID = 6961;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch {
        setErrorMessage('Error occured when data loaded.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    };

    getTodosFromServer();
  }, []);

  const hasActiveTodos = todos.filter(todo => !todo.completed).length !== 0;
  const hasCompletedTodos = todos.filter(todo => todo.completed).length !== 0;

  const visibleTodos = getVisibleTodos(todos, filterType);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasActiveTodos={hasActiveTodos} />

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <ListFilter
            todosCount={todos.length}
            hasCompletedTodos={hasCompletedTodos}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
          />
        )}
      </div>

      <div
        className={classNames(
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
          aria-label="error-close-button"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
