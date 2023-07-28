/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader';
import { TodoItem } from './components/TodoItem';
import { TodoFooter } from './components/TodoFooter';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

const USER_ID = 11142;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.all);
  const numberOfAllTodos = todos.length;
  const numberOfCompletedTodos = todos.filter(todo => todo.completed).length;
  const numberOfActiveTodos = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, []);

  const visibleTodos = useMemo(() => {
    if (todos) {
      return todos
        .filter(todo => {
          switch (status) {
            case Status.completed:
              return todo.completed;

            case Status.active:
              return !todo.completed;

            default:
              return true;
          }
        });
    }

    return [];
  }, [todos, status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader numberOfActiveTodos={numberOfActiveTodos} />
        {numberOfAllTodos !== 0 && (
          <>
            <TodoItem todos={visibleTodos} />
            <TodoFooter
              numberOfActiveTodos={numberOfActiveTodos}
              numberOfCompletedTodos={numberOfCompletedTodos}
              onStatusChange={setStatus}
              status={status}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error
      Add the 'hidden' class to hide the message smoothly
        <Errors /> */}
    </div>
  );
};
