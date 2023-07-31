/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoNotification } from './components/TodoNotification';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 10818;

enum Error {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
  NOTHING = '',
  FETCH = 'fetch',
}

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(Error.NOTHING);
  const [filterTodo, setFilterTodo] = useState(Filter.ALL);

  const filteredTodos = useMemo(() => {
    switch (filterTodo) {
      case Filter.COMPLETED:
        return todo.filter(todos => todos.completed);
      case Filter.ACTIVE:
        return todo.filter(todos => !todos.completed);
      default:
        return todo;
    }
  }, [filterTodo, todo]);

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => setTodo(data))
      .catch(() => setHasError(Error.FETCH));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList
          filteredTodos={filteredTodos}
        />
        <TodoFooter
          todos={todo}
          filterTodos={filterTodo}
          setFilterTodos={setFilterTodo}
        />
      </div>

      {hasError !== Error.NOTHING && (
        <TodoNotification
          hasError={hasError}
          setHasError={setHasError}
        />
      )}
    </div>
  );
};
