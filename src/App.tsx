import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { wait } from './utils/fetchClient';
import { SortField } from './types/SortField';
import { filterTodos } from './utils/helpers.ts/filterTodos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/Todolist';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState(SortField.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        wait(3000).then(() => setError(''));
      });
  }, []);

  const filteredTodos = filterTodos(todos, filter);
  const handelFilter = (filterValue: SortField) => {
    setFilter(filterValue);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {todos.length && (
          <Footer todos={todos} filter={filter} handelFilter={handelFilter} />
        )}
      </div>
      <ErrorNotification error={error} />
    </div>
  );
};
