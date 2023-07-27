/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { ErrorStatus, Filter, Todo } from './types';

const USER_ID = 11225;

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.All);

  const activeCount = allTodos.reduce(
    (total, todo) => (todo.completed ? total : total + 1),
    0,
  );

  const filteredTodos = allTodos.filter(todo => {
    switch (filter) {
      case Filter.Completed:
        return todo.completed;

      case Filter.Active:
        return !todo.completed;

      default:
        return true;
    }
  });

  const showErrorMessage = (message: string): void => {
    setErrorMessage(message);

    setInterval(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    setErrorMessage('');

    getTodos(USER_ID)
      .then(setAllTodos)
      .catch(() => showErrorMessage(ErrorStatus.Load));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {allTodos.length > 0 && <TodoList todos={filteredTodos} /> }

        {/* Hide the footer if there are no todos */}
        {allTodos.length > 0 && (
          <Footer
            activeCount={activeCount}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <ErrorMessage
        message={errorMessage}
        setMessage={setErrorMessage}
      />
    </div>
  );
};
