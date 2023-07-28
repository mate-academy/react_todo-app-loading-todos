/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodoHeader } from './Components/TodoHeader';
import { TodoMain } from './Components/TodoMain';
import { TodoFooter } from './Components/TodoFooter';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11143;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(setIsError);
  }, []);

  const preparedTodos = [...todos]
    .filter((todo) => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedTitle = todo.title.toLowerCase().trim();

      return query ? normalizedTitle.includes(normalizedQuery) : true;
    })
    .filter((todo) => {
      switch (filterType) {
        case 'active': return !todo.completed;
        case 'completed': return todo.completed;
        default: return todo;
      }
    });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          query={query}
          setQuery={setQuery}
        />

        {todos && (
          <TodoMain
            todos={preparedTodos}
          />
        )}

        {todos && (
          <TodoFooter
            filterType={filterType}
            setFilterType={setFilterType}
            todos={preparedTodos}
          />
        )}
      </div>

      {isError && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button type="button" className="delete" />

          {/* show only one message at a time */}
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>

      )}
    </div>
  );
};
