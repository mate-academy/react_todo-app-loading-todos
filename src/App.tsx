/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { ErrorMessage } from './types/ErrorMessages';
import { ErrorNotification }
  from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoStatus, setTodoStatus] = useState<TodoStatus>(TodoStatus.ALL);
  const [errorMessage, setErrorMessage]
  = useState<ErrorMessage>(ErrorMessage.NONE);

  const visibleTodos = useMemo(() => {
    return (todos.filter((todo) => {
      switch (todoStatus) {
        case TodoStatus.ACTIVE:
          return !todo.completed;
        case TodoStatus.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    })
    );
  }, [todoStatus, todos]);

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
        <Header />

        {!!todos.length && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              todos={visibleTodos}
              todoStatus={todoStatus}
              setTodoStatus={setTodoStatus}
            />
          </>
        )}
      </div>

      {!!errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          closeError={() => setErrorMessage(ErrorMessage.NONE)}
        />
      )}
    </div>
  );
};
