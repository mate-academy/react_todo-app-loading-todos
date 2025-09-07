/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { Status } from './types/Status';
import { ErrorMessage } from './types/ErorrMessage';
import { TodoHeader } from './components/TodoHeader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | ''>('');
  const [status, setStatus] = useState<Status>(Status.ALL);

  useEffect(() => {
    async function loadTodos() {
      try {
        const newTodos = await getTodos();

        setTodos(newTodos);
      } catch (error) {
        setErrorMessage(ErrorMessage.LOAD);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        throw error;
      }
    }

    loadTodos();
  }, []);

  const filtredTodos = useMemo(() => {
    let list = todos;

    if (status === 'Active') {
      list = list.filter(todo => !todo.completed);
    } else if (status === 'Completed') {
      list = list.filter(todo => todo.completed);
    }

    return list;
  }, [status, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />

        <TodoList todos={filtredTodos} />

        {!!todos.length && (
          <TodoFooter
            todos={todos}
            status={status}
            onStatusChange={setStatus}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClearMessage={() => setErrorMessage('')}
      />
    </div>
  );
};
