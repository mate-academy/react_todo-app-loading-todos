import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ErrorNotification } from './Components/ErrorNotification/Error';
import { Filter } from './Components/Filter/Filter';
import { FilterStatus } from './types/FilterStatus';
import { Header } from './Components/Header/Header';
import { TodoList } from './Components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | ''>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const loadTodos = async () => {
    setErrorMessage('');

    try {
      const todosFromServer = await getTodos();

      if (todosFromServer.length === 0) {
        setErrorMessage(ErrorMessage.LoadTodos);
      }

      setTodos(todosFromServer);
    } catch (err) {
      setErrorMessage(ErrorMessage.LoadTodos);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const timerId = errorMessage
      ? setTimeout(() => setErrorMessage(''), 3000)
      : null;

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [errorMessage]);

  const visibleTodos = todos.filter(todo => {
    switch (filterStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} inputRef={inputRef} />

        <TodoList todos={visibleTodos} />

        {}
        {todos.length > 0 && (
          <Filter
            todos={todos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
      </div>

      {}
      {}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
