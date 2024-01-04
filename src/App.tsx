import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Status } from './types/Status';

const USER_ID = 12143;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [filterBy, setFilterBy] = useState(Status.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsError(true);
      });
  }, []);

  const filterTodos = (allTodos: Todo[]): Todo[] => {
    switch (filterBy) {
      case Status.COMPLETED:
        return allTodos.filter(todo => todo.completed);
      case Status.ACTIVE:
        return allTodos.filter(todo => !todo.completed);
      default:
        return allTodos;
    }
  };

  const filteredTodos = filterTodos(todos);

  useEffect(() => {
    const timeoutId = 0;

    if (errorMessage) {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            filter={filterBy}
            setFilter={setFilterBy}
            todos={todos}
          />
        )}
      </div>

      {errorMessage && (
        <Error
          errorMessage={errorMessage}
          hideError={() => setIsError(false)}
          isHidden={!isError}
        />
      )}

    </div>
  );
};
