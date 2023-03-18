/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos, USER_ID } from './api/todos';
import { ErrorMessage } from './types/ErrorMessage';
import { Errors } from './components/Errors/Errors';
import { SortType } from './types/SortType';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.ALL);
  const [errorMessage, setErrorMessage]
    = useState<ErrorMessage>(ErrorMessage.NONE);

  const visibleTodos = useMemo(() => {
    return (todos.filter((todo) => {
      switch (sortType) {
        case SortType.ACTIVE:
          return !todo.completed;
        case SortType.COMPLETE:
          return todo.completed;
        default:
          return true;
      }
    })
    );
  }, [sortType, todos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        setErrorMessage(ErrorMessage.LOAD);
      }
    };

    fetchData();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodosLength={visibleTodos.length} />
        <TodoList todos={visibleTodos} />
      </div>

      <Footer
        setSortType={setSortType}
        sortType={sortType}
        activeTodosLength={visibleTodos.length}
      />

      {errorMessage && (
        <Errors
          errorMessage={errorMessage}
          closeError={() => setErrorMessage(ErrorMessage.NONE)}
        />
      )}
    </div>
  );
};
