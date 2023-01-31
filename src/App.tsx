/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotifiaction/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');

  const handleClickCloseError = () => {
    setIsError(false);
  };

  const handleFilterStatusChange = (status: FilterStatus) => {
    setFilterStatus(status);
  };

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setIsError(true);
          setErrorMessage('Unable to load todos');
        });
    }
  }, [user]);

  const visibleTodos = todos.filter(todo => {
    switch (filterStatus) {
      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return true;
    }
  });

  if (isError) {
    setTimeout(() => setIsError(false), 3000);
  }

  const todosToCompleteCounter = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length !== 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              filterStatus={filterStatus}
              todosLeft={todosToCompleteCounter}
              AllTodos={todos.length}
              onFilterSelect={handleFilterStatusChange}
            />
          </>
        )}
      </div>
      {errorMessage && (
        <ErrorNotification
          message={errorMessage}
          onClose={handleClickCloseError}
          isError={isError}
        />
      )}
    </div>
  );
};
