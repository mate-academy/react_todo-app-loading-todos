/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');
  const [loading] = useState(0);

  useEffect(() => {
    getTodos()
      .then(t => {
        setTodos(t);
      })
      .catch(err => {
        setError(true);
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setError(false);
        }, 3000);
        throw err;
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return todo;
    }

    if (filter === 'ACTIVE') {
      return !todo.completed;
    }

    if (filter === 'COMPLETED') {
      return todo.completed;
    }

    return;
  });

  const handleFilter = (type: 'ALL' | 'ACTIVE' | 'COMPLETED') => {
    setFilter(type);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList filteredTodos={filteredTodos} loading={loading} />

        {todos.length > 0 && (
          <Footer todos={todos} filter={filter} onHandleFilter={handleFilter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(false)}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
