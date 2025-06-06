/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { getTodos, USER_ID } from './api/todos';
import { wait } from './utils/fetchClient';
import { filteringTodos } from './utils/queueTodos';
import { countItemsLeft } from './utils/countItemsLeft';
import { Todo } from './types/Todo';
import { TodoFilter } from './types/TodoFilter';

import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('All');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(todosRecieved => {
        setAllTodos(todosRecieved);
      })
      .catch(() => {
        setError('Unable to load todos');
        wait(3000).then(() => setError(''));
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const queuedTodos: Todo[] = filteringTodos(allTodos, filter);
  const itemsLeft: number = countItemsLeft(allTodos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={queuedTodos} />

        {allTodos.length > 0 && (
          <Footer filter={filter} setFilter={setFilter} itemsLeft={itemsLeft} />
        )}
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
