import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

import { Filter } from './enums/Filter';
import { ErrorMessage } from './enums/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const showError = (message: string) => {
    setError(message);
    setIsErrorVisible(true);

    setTimeout(() => setIsErrorVisible(false), 3000);
  };

  const hideError = () => setIsErrorVisible(false);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    hideError();

    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessage.Load));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(t => !t.completed);

      case Filter.Completed:
        return todos.filter(t => t.completed);

      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  const allCompleted = todos.length > 0 && completedCount === todos.length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header allCompleted={allCompleted} />

        {todos.length > 0 && <TodoList todos={filteredTodos} />}

        {todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !isErrorVisible },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />

        {error}
      </div>
    </div>
  );
};
