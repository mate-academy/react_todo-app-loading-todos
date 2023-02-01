/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';// import Authprovider+
import { TodoList } from './components/Auth/TodoList';
import { ErrorNotification } from './components/Auth/ErrorNotification';
import { Footer } from './components/Auth/Footer';
import { Header } from './components/Auth/Header';
import { Todo } from './types/Todo';
import { swithCase } from './heleprs';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
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

  const preaperedTodo = swithCase(statusFilter, todos);

  return (
    //  use Tag Authprovider
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />
        {todos.length !== 0 && (
          <TodoList
            preaperedTodo={preaperedTodo}
          />
        )}
        <Footer
          onStatusFilterChange={setStatusFilter}
          statusFilter={statusFilter}
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
