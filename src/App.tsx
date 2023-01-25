/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';// import Authprovider+
import { Content } from './components/Auth/Content';
import { ErrorNotification } from './components/Auth/ErrorNotification';
import { Footer } from './components/Auth/Footer';
import { Header } from './components/Auth/Header';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('All');
  const [errorMessage, setErrorMessage] = useState('');

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  const closeErrorMessage = useCallback(() => {
    setErrorMessage('');
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    getTodos(user?.id || 0)
      .then(todo => setTodos(todo))
      .catch(() => {
        showError('Error request for todos failed');
      });
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const uncompletedAmount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  const swithCase = (value: string) => {
    switch (value) {
      case 'Active':
        return todos.filter(todo => todo.completed === false);

      case 'Completed':
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const preaperedTodo = swithCase(status);

  return (
    //  use Tag Authprovider
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length !== 0 && (
          <Content
            preaperedTodo={preaperedTodo}
          />
        )}
        <Footer
          onStatus={setStatus}
          status={status}
          uncompletedAmount={uncompletedAmount}
        />
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          close={closeErrorMessage}
        />
      )}
    </div>
  );
};
