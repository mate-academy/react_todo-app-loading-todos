import React, { useEffect, useMemo, useState } from 'react';

import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';

import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { Error } from './types/Error';

import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoMain/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';

const USER_ID = 12002;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState<Status>(Status.All);
  const [todoError, setTodoError] = useState<Error | null>(null);

  useEffect(() => {
    setTodoError(null);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setTodoError(Error.LoadTodos));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (todoFilter) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todoFilter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <TodoHeader />

        {!!todos.length && (
          <div className="wrapper">
            <TodoList todos={filteredTodos} />

            <TodoFooter
              todos={todos}
              todoFilter={todoFilter}
              setTodoFilter={setTodoFilter}
            />
          </div>
        )}
      </div>

      <TodoError
        todoError={todoError}
        setTodoError={setTodoError}
      />
    </div>
  );
};
