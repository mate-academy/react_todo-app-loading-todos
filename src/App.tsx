/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';

import { USER_ID, getTodos, postTodo } from './api/todos';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification, ErrorType } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setError('load'));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        case 'all':
          return todo;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const handleClosingError = useCallback(() => setError(null), [setError]);

  const addTodo = (newTodoTitle: string) => {
    postTodo({ title: newTodoTitle, userId: USER_ID, completed: false }).then(
      newTodo => {
        setTodos(prevTodos => [...prevTodos, newTodo]);
      },
    );
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} addTodo={addTodo} />
        <TodoList todos={filteredTodos} />
        <Footer todos={todos} filter={filter} setFilter={setFilter} />
      </div>
      <ErrorNotification
        errorType={error}
        handleClosingError={handleClosingError}
      />
    </div>
  );
};
