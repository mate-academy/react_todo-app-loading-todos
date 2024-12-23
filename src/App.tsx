/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer/Footer';
import { ErrorMessages } from './types/Errors';
import { Errors } from './components/Errors/Errors';
import { Header } from './components/Header/Header';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.Empty,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessages.UnableToLoad);
        const timerId = setTimeout(
          () => setErrorMessage(ErrorMessages.Empty),
          3000,
        );

        return () => {
          clearTimeout(timerId);
        };
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filters.Completed:
        return todo.completed;

      case Filters.Active:
        return !todo.completed;

      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {!!todos.length && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              activeTodosCount={activeTodosCount}
              setFilter={setFilter}
              filter={filter}
            />
          </>
        )}
      </div>
      <Errors
        errorMessage={errorMessage}
        clearError={() => setErrorMessage(ErrorMessages.Empty)}
      />
    </div>
  );
};
