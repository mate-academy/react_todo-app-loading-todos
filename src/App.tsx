import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Footer } from './components/Footer';
import FilterStatus from './enums/FilterStatus';

const USER_ID = 2338;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const loadTodos = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setShowError(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    } catch (error) {
      setErrorMessage('Unable to load todos');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setTimeout(() => setIsLoading(false), 200);
    }
  };

  useEffect(() => {
    if (USER_ID) {
      loadTodos();
    } else {
      setShowError(true);
    }

    return () => {
      setErrorMessage('');
    };
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  const hideError = () => {
    setErrorMessage('');
    setShowError(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
            />
          )}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filteredTodos} isLoading={isLoading} />
        </section>

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
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
          { hidden: !showError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />
        {errorMessage}
      </div>
    </div>
  );
};
