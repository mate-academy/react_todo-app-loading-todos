/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Filters } from './components/Filters/Filters';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterStatus>(FilterStatus.All);

  useEffect(() => {
    getTodos(user?.id).then(setTodos);
  }, []);

  const filterTodos = todos.filter((todo) => {
    switch (filterType) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <NewTodo query={query} setQuery={setQuery} todos={todos} />

        <TodoList todos={filterTodos} />

        {Boolean(todos.length) && (
          <Filters
            todos={todos}
            setFilterType={setFilterType}
            filterType={filterType}
          />
        )}
      </div>

      {error && <ErrorNotification setError={setError} error={error} />}
    </div>
  );
};
