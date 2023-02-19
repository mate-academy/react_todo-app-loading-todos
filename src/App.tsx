/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { getVisibleTodos } from './utils/helper';
import { FilterType } from './types/FilterType';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notifications } from './components/Notifications';

const USER_ID = 6356;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorType, setErrorType] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(FilterType.all);

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
      setIsTodosLoaded(true);
    } catch (error) {
      setIsError(true);
      setErrorType('upload');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = getVisibleTodos(selectedFilter as FilterType, todos);

  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  const handleError = (bool: boolean) => {
    setIsError(bool);
  };

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

        <TodoList todos={visibleTodos} />

        {isTodosLoaded && (
          <Footer
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        )}

      </div>

      <Notifications
        errorType={errorType}
        isError={isError}
        setIsError={handleError}
      />

    </div>
  );
};
