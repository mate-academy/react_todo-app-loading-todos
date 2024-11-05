/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useLayoutEffect, useMemo, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/Todo/TodoHeader/TodoHeader';
import { TodoList } from './components/Todo/TodoList/TodoList';
import { TodoFooter } from './components/Todo/TodoFooter/TodoFooter';
import { TodoErrors } from './utils/enums/TodoErrors';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { FilterStatuses } from './utils/enums/FilterStatuses';
import { getFiltredTodo } from './utils/todos/filterTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<TodoErrors | null>(null);

  const [status, setStatus] = useState<FilterStatuses>(FilterStatuses.All);

  const filtredTodos = useMemo(
    () => getFiltredTodo(todos, status),
    [status, todos],
  );

  useLayoutEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(TodoErrors.load);
        setTimeout(() => setError(null), 3000);
      });
  }, []);

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
          <TodoFooter todos={todos} setStatus={setStatus} status={status} />
        )}
      </div>

      <ErrorNotification error={error} />
    </div>
  );
};
