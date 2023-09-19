/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';

const USER_ID = 11478;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState('');

  const filtredTodos = useMemo(() => todos.filter(({ completed }) => {
    switch (filter) {
      case Filter.Active:
        return !completed;
      case Filter.Completed:
        return completed;
      default:
        return true;
    }
  }), [filter, todos]);

  const fetchTodos = async () => {
    try {
      setError('');
      const fetchedTodos = await getTodos(USER_ID);

      setTodos(fetchedTodos);
    } catch {
      setError('Unable to load todos');
      setTimeout(() => setError(''), 3000);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {!!todos.length && <Main todos={filtredTodos} />}
        {!!todos.length
          && (
            <Footer
              todos={filtredTodos}
              filter={filter}
              setFilter={setFilter}
            />
          )}
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
