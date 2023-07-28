/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoNotification } from './components/TodoNotification';
import { Error, Filter, Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 11041;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(Error.NOTHING);
  const [filterTodos, setFilterTodos] = useState(Filter.ALL);

  const filteredTodos = useMemo(() => {
    switch (filterTodos) {
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [filterTodos, todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => setTodos(data))
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
        {/* Hide the footer if there are no todos */}
        <TodoFooter
          todos={todos}
          filterTodos={filterTodos}
          setFilterTodos={setFilterTodos}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {hasError !== Error.NOTHING && (
        <TodoNotification
          hasError={hasError}
          setHasError={setHasError}
        />
      )}
    </div>
  );
};
