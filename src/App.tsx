import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Todos } from './components/Todos';
import { ErrorType } from './types/ErorrType';
import { ErrorMes } from './components/ErrorMes';
import { Filter } from './types/Filter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const USER_ID = 11072;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(ErrorType.None);
  const [filter, setFilter] = useState(Filter.All);

  const showError = (notification: ErrorType) => {
    setErrorMessage(notification);
    setInterval(() => {
      setErrorMessage(ErrorType.None);
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((todoFromServer) => {
        setTodos(todoFromServer);
      })
      .catch(() => showError(ErrorType.Loading));
  }, []);

  const visibleTodos = useMemo(() => todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  }), [filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />
        <Todos todos={visibleTodos} />
        {todos.length
          && (
            <Footer
              todos={todos}
              filter={filter}
              setFilter={setFilter}
            />
          )}
      </div>

      <ErrorMes
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
