import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';

import { TodoHeader } from './api/components/TodoHeader';
import { TodoList } from './api/components/TodoList';
import { TodoFooter } from './api/components/TodoFooter';

import { ErrorOnPage } from './api/components/ErrorOnPage';

import { FilterBy } from './utils/FilterBy';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

import { getFilteredTodos } from './utils/NewFilterTodos';

const USER_ID = 1333;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [newError, setNewError] = useState<null | string>(null);

  const getTodoFromServer = () => {
    return async () => {
      try {
        const todoFromServer = await getTodos(USER_ID);

        setTodos(todoFromServer);
      } catch {
        setNewError('Unable to upload todos');
      }
    };
  };

  useEffect(() => {
    getTodoFromServer();
  }, []);

  const filterTodos = useMemo(() => {
    return getFilteredTodos(todos, filterBy);
  }, [todos, filterBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <section className="todoapp__main">
          <TodoList todos={filterTodos} />
        </section>

        <TodoFooter
          todos={todos}
          filterBy={filterBy}
          filterTodos={setFilterBy}
        />

        {newError && (
          <ErrorOnPage
            error={newError}
            setNewError={setNewError}
          />
        )}
      </div>
    </div>
  );
};
