/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Filter } from './components/Filter/Filter';
import { FilterStatus } from './types/FilterStatus';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
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

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Filter
            todos={todos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
