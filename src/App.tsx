/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoContent } from './components/TodoContent';
import { Notifications } from './components/Notifications';

const USER_ID = 10875;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo []>([]);
  const [isHasError, setIsHasError] = useState(false);

  useEffect(() => {
    setIsHasError(false);
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setIsHasError(true);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const closeNotification = () => {
    setIsHasError(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent todos={todos} />
      {isHasError && <Notifications onClose={closeNotification} />}
    </div>
  );
};
