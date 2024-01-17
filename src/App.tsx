/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodoHeader } from './components/TodoHeader';
import { Status } from './types/Status';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Errors } from './components/Errors';

const USER_ID = 12173;

export const App: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState(Status.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setHasError(true));
  }, []);

  const prepearedTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />
        {!!todos.length && (
          <>
            <TodoList todos={prepearedTodos} />
            <TodoFooter
              setFilterStatus={setFilterStatus}
              filterStatus={filterStatus}
              todos={todos}
            />
          </>
        )}

      </div>
      {hasError && <Errors />}
    </div>
  );
};
