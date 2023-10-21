import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { Status } from './types/Status';

import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Notification } from './components/Notification';

const USER_ID = 11713;

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(Errors.Load);

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setLoader(false));
  }, []);

  const activeTodosLength = [...todos]
    .filter(({ completed }) => !completed).length;

  const completedTodosLength = [...todos]
    .filter(({ completed }) => completed).length;

  const removeErrorMessage = () => setErrorMessage('');

  const changeTodosStatus = (status: string) => {
    switch (status) {
      case Status.active:
        return setFilterStatus(Status.active);
      case Status.completed:
        return setFilterStatus(Status.completed);
      default:
        return setFilterStatus(Status.all);
    }
  };

  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case Status.active:
        return [...todos].filter(({ completed }) => !completed);
      case Status.completed:
        return [...todos].filter(({ completed }) => completed);
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {!loader && <TodoList todos={filteredTodos} />}

        {todos.length > 0 && (
          <TodoFooter
            activeTodosLength={activeTodosLength}
            completedTodosLength={completedTodosLength}
            filterStatus={filterStatus}
            changeTodosStatus={changeTodosStatus}
          />
        )}
      </div>

      <Notification
        errorMessage={errorMessage}
        removeErrorMessage={removeErrorMessage}
      />
    </div>
  );
};
