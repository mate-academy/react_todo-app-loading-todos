/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoAdder } from './components/TodoAdder';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 10953;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isCompleted, setIsCompleted] = useState('all');
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setErr('Error: cannot upload todos'));
  }, []);

  useEffect(() => {
    let errorTimer: number;

    if (err) {
      errorTimer = window.setTimeout(() => {
        setErr(null);
      }, 3000);
    }

    return () => {
      clearTimeout(errorTimer);
    };
  }, [err]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  let visibleTodos = [...todos];

  const filterByStatus = (todosList: Todo[], todoStatus: boolean) => (
    todosList.filter(todo => todo.completed === todoStatus)
  );

  if (isCompleted === 'completed') {
    visibleTodos = filterByStatus(visibleTodos, true);
  }

  if (isCompleted === 'active') {
    visibleTodos = filterByStatus(visibleTodos, false);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAdder />

        <TodoList
          todos={visibleTodos}
        />

        {visibleTodos.length > 0 && (
          <TodoFilter
            todos={visibleTodos}
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        err={err}
        setErr={setErr}
      />
    </div>
  );
};
