// App.tsx
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, filterByStatus } from './api/todos';
import { TypeTodo } from './types/Todo';
import classNames from 'classnames';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [todos, setTodos] = useState<TypeTodo[]>([]);

  const filterStatus = (type: FilterType) => {
    setFilterType(type);
    setIsLoading(true);

    filterByStatus(type)
      .then(response => {
        setTodos(response);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const clearErrorMessage = () => {
      timeoutId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    };

    setIsLoading(true);
    filterByStatus(filterType)
      .then(response => {
        setTodos(response);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        clearErrorMessage();
      });

    return () => clearTimeout(timeoutId);
  }, [filterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList isLoading={isLoading} todos={todos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            filterStatus={filterStatus}
            filterType={filterType}
            todos={todos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={
          classNames(
            "notification is-danger is-light has-text-weight-normal",
            {"hidden": errorMessage === "" }
          )
        }
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
