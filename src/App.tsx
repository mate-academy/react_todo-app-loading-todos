/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Error } from './components/Error/Error';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Todolist } from './components/Todolist/Todolist';
import { ErrorMessage } from './types/ErrorMessage';
import { TodoStatus } from './types/TodoStatus';

const USER_ID = 10890;

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatus>(TodoStatus.all);
  const [isError, setIsError] = useState<ErrorMessage>(ErrorMessage.noError);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setVisibleTodos)
      .catch(() => {
        setIsError(ErrorMessage.loadError);
      });
  }, []);

  const handleCloseError = () => {
    setIsError(ErrorMessage.noError);
  };

  const filteredTodos = useCallback(() => {
    switch (filter) {
      case TodoStatus.completed:
        return visibleTodos.filter(todo => todo.completed);

      case TodoStatus.active:
        return visibleTodos.filter(todo => !todo.completed);

      default:
        return visibleTodos;
    }
  }, [filter, visibleTodos]);

  const completedTodos = filteredTodos().filter(todo => todo.completed);
  const activeTodos = filteredTodos().filter(todo => !todo.completed);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          activeTodos={activeTodos}
          handleSubmit={handleSubmit}
        />
        <Todolist
          filteredTodos={filteredTodos()}
        />

        {filteredTodos() && (
          <Footer
            activeTodos={activeTodos}
            filter={filter}
            setFilter={setFilter}
            completedTodos={completedTodos}
          />
        )}
      </div>

      {isError && (
        <Error
          isError={isError}
          handleCloseError={handleCloseError}
        />
      )}
    </div>
  );
};
