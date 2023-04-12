import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { SortType } from './types/SortType';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Errors } from './components/Errors';
import { ErrorMessage } from './types/ErrorMessage';

const USER_ID = 6713;

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

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodosLength={visibleTodos.length} />
        <TodoList todos={visibleTodos} />

        {todos.length && (
          <Footer
            setSortType={setSortType}
            sortType={sortType}
            activeTodosLength={visibleTodos.length}
          />
        )}
      </div>

      {
        errorMessage && (
          <Errors
            errorMessage={errorMessage}
            closeError={() => setErrorMessage(ErrorMessage.NONE)}
          />
        )
      }
    </div>
  );
};
