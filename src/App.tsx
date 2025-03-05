import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const visibleTodos = todos.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      case FilterStatus.All:
      default:
        return true;
    }
  });

  const completedTodos = todos.filter(todo => todo.completed).length;

  const handleLoadError = () => {
    setErrorMessage('Unable to load todos');
    window.setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    getTodos()
      .then(result => {
        setTodos(result);
      })
      .catch(() => handleLoadError())
      .finally(() => setLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!loading && <TodoList todos={visibleTodos} />}

        {todos.length !== 0 && (
          <Footer
            todosCount={todos.length}
            completedTodosCount={completedTodos}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
