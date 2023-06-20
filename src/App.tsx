import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/Todolist';
import { Notification } from './components/Notification';
import { Filter } from './types/Filter';

const USER_ID = 10683;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState('');
  const hasTodos = todos.length > 0;

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleFilter = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={todos} filter={filter} />

        {hasTodos && (
          <Footer todos={todos} filter={filter} handleFilter={handleFilter} />
        )}
      </div>

      {error && (
        <Notification error={error} />
      )}
    </div>
  );
};
