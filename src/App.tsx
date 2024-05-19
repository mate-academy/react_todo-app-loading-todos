/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { Error } from './types/Error';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(Status.All);

  const title = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(res => setTodos(res))
      .catch(() => setError(Error.UnableLoad))
      .finally(() => {
        setTimeout(() => {
          setError('');
        }, 3000);
      });
    title.current?.focus();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header title={title} />
        <TodoList todos={todos} selectedFilter={filter} />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            selectedFilter={filter}
            setSelectedFilter={setFilter}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {error}
      </div>
    </div>
  );
};
