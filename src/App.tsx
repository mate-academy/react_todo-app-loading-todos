/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Filter } from './types/Filter';
import { TodosList } from './componets/TodosList';
import { Header } from './componets/Header';
import { Footer } from './componets/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [isHidden, setIsHidden] = useState(true);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      return () => {};
    }
  }, [errorMessage]);

  const handleClose = () => {
    setTimeout(() => setErrorMessage(''), 1000);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const numberActiveTodos: number = todos.filter(
    todo => !todo.completed,
  ).length;

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed;

      case Filter.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodosList todos={filteredTodos} loading={loading} />

        {todos.length > 0 && (
          <Footer
            numberActiveTodos={numberActiveTodos}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
        onClick={handleClose}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
