/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodosList } from './components/TodosList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notifications } from './components/Notifications';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Status } from './types/Status';

const USER_ID = 6325;

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.ALL);
  const [errorType, setErrorType] = useState('');
  const [isError, setIsError] = useState(false);
  let visibleTodos = todos;

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setIsError(true);
      setErrorType('upload');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const handleInput = (value: string) => {
    setQuery(value);
  };

  const handlerError = (value: boolean) => {
    setIsError(value);
  };

  switch (status) {
    case Status.ALL:
      visibleTodos = todos;
      break;
    case Status.ACTIVE:
      visibleTodos = todos.filter(todo => !todo.completed);
      break;
    case Status.COMPLETED:
      visibleTodos = todos.filter(todo => todo.completed);
      break;
    default:
      throw new Error('Unexpected status');
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          todos={todos}
          setQuery={handleInput}
        />
        <TodosList todos={visibleTodos} />

        {todos.length > 0
          && (
            <Footer
              todos={visibleTodos}
              status={status}
              setStatus={setStatus}
            />
          )}
      </div>
      <Notifications
        errorType={errorType}
        isError={isError}
        setIsError={handlerError}
      />
    </div>
  );
};
